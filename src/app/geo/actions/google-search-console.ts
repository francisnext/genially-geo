'use server';

import { google } from 'googleapis';

export async function getSearchConsoleData(days = 60, requestedSiteUrl?: string) {
    const clientEmail = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY;
    const siteUrl = requestedSiteUrl || process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;

    if (!clientEmail || !privateKeyRaw || !siteUrl) {
        console.error('GSC Error: Missing credentials');
        return { success: false, error: 'Credenciales de Google no configuradas' };
    }

    try {
        const privateKey = privateKeyRaw.replace(/\\n/g, '\n').replace(/\n/g, '\n').trim();
        const auth = new google.auth.GoogleAuth({
            credentials: { client_email: clientEmail, private_key: privateKey },
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });

        const searchconsole = google.searchconsole({ version: 'v1', auth });

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 2); // Stability: GSC data is usually 2 days old
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const lastYearStart = new Date(startDate);
        lastYearStart.setDate(lastYearStart.getDate() - 364); // 52 weeks ago (Monday-Monday alignment)
        const lastYearEnd = new Date(endDate);
        lastYearEnd.setDate(lastYearEnd.getDate() - 364);

        // Fetch current and previous year data in parallel
        const [currentRes, lastYearRes] = await Promise.all([
            searchconsole.searchanalytics.query({
                siteUrl: siteUrl,
                requestBody: {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    dimensions: ['date', 'query'],
                    rowLimit: 5000,
                },
            }),
            searchconsole.searchanalytics.query({
                siteUrl: siteUrl,
                requestBody: {
                    startDate: formatDate(lastYearStart),
                    endDate: formatDate(lastYearEnd),
                    dimensions: ['date', 'query'],
                    rowLimit: 5000,
                },
            })
        ]);

        const rows = currentRes.data.rows || [];
        const prevRows = lastYearRes.data.rows || [];
        
        // Helper to get ISO week number
        const getWeekNumber = (d: Date) => {
            const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
            const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        };

        const weeklyData: Record<string, any> = {};
        const brandingSummary = { branded: { clicks: 0, impressions: 0 }, nonBranded: { clicks: 0, impressions: 0 } };
        const prevBrandingSummary = { branded: { clicks: 0, impressions: 0 }, nonBranded: { clicks: 0, impressions: 0 } };
        const queryList: Record<string, any> = {};

        // Expresión regular para detectar la marca y typos comunes
        const brandRegex = /genial|genaly|genally|geniali|genilly|geyially/i;

        // Current Year Processing
        rows.forEach(row => {
            const date = new Date(row.keys![0]);
            const query = row.keys![1].toLowerCase();
            const weekKey = `W${getWeekNumber(date)}-${date.getFullYear()}`;
            const isBranded = brandRegex.test(query);

            if (!weeklyData[weekKey]) {
                weeklyData[weekKey] = { week: weekKey, clicks: 0, impressions: 0, brandedClicks: 0, nonBrandedClicks: 0 };
            }
            weeklyData[weekKey].clicks += (row.clicks || 0);
            weeklyData[weekKey].impressions += (row.impressions || 0);
            if (isBranded) {
                weeklyData[weekKey].brandedClicks += (row.clicks || 0);
                brandingSummary.branded.clicks += (row.clicks || 0);
                brandingSummary.branded.impressions += (row.impressions || 0);
            } else {
                weeklyData[weekKey].nonBrandedClicks += (row.clicks || 0);
                brandingSummary.nonBranded.clicks += (row.clicks || 0);
                brandingSummary.nonBranded.impressions += (row.impressions || 0);
                
                if (!queryList[query]) queryList[query] = { query, clicks: 0, impressions: 0, position: 0, count: 0 };
                queryList[query].clicks += (row.clicks || 0);
                queryList[query].impressions += (row.impressions || 0);
                queryList[query].position += (row.position || 0);
                queryList[query].count += 1;
            }
        });

        // Last Year Totals Processing
        prevRows.forEach(row => {
            const query = row.keys![1].toLowerCase();
            const isBranded = brandRegex.test(query);
            if (isBranded) {
                prevBrandingSummary.branded.clicks += (row.clicks || 0);
            } else {
                prevBrandingSummary.nonBranded.clicks += (row.clicks || 0);
            }
            prevBrandingSummary.branded.impressions += (isBranded ? (row.impressions || 0) : 0);
            prevBrandingSummary.nonBranded.impressions += (!isBranded ? (row.impressions || 0) : 0);
        });

        const topQueries = Object.values(queryList)
            .map((q: any) => ({ ...q, position: q.position / q.count }))
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 10);

        const currentTotalClicks = brandingSummary.branded.clicks + brandingSummary.nonBranded.clicks;
        const prevTotalClicks = prevBrandingSummary.branded.clicks + prevBrandingSummary.nonBranded.clicks;
        const currentTotalImpressions = brandingSummary.branded.impressions + brandingSummary.nonBranded.impressions;
        const prevTotalImpressions = prevBrandingSummary.branded.impressions + prevBrandingSummary.nonBranded.impressions;

        return {
            success: true,
            data: {
                weeklyRows: Object.values(weeklyData).sort((a, b) => {
                    const [wA, yA] = a.week.substring(1).split('-').map(Number);
                    const [wB, yB] = b.week.substring(1).split('-').map(Number);
                    return yA === yB ? wA - wB : yA - yB;
                }),
                branding: {
                    brandedPercent: (brandingSummary.branded.clicks / (currentTotalClicks || 1)) * 100,
                    ...brandingSummary
                },
                topNonBranded: topQueries,
                totals: {
                    clicks: currentTotalClicks,
                    impressions: currentTotalImpressions,
                    prevClicks: prevTotalClicks,
                    prevImpressions: prevTotalImpressions,
                    branding: {
                        prevBrandedClicks: prevBrandingSummary.branded.clicks,
                        prevNonBrandedClicks: prevBrandingSummary.nonBranded.clicks
                    }
                }
            }
        };
    } catch (error: any) {
        console.error('Error fetching Search Console data:', error);
        return { success: false, error: error.message };
    }
}
