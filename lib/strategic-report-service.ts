import { collection, getDocs, query, orderBy, limit, addDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { SampleDatasetItem } from '@/data/sample-dataset';
import { normalizeBrandName } from './competitors';

export interface StrategicReport {
    _id?: string;
    date: string; // The date of the data batch analyzed
    generatedAt: string;
    reportContent: {
        summary: string;
        clusters: {
            name: string;
            sov: number;
            avgPos: number;
            sentiment: number;
            strengths: string[];
            weaknesses: string[];
            sentimentDrivers?: {
                positive: string[];
                negative: string[];
            };
        }[];
        actionPlan: {
            title: string;
            description: string;
            priority: 'High' | 'Medium' | 'Low';
            term?: 'plazo corto' | 'plazo medio' | 'plazo largo';
            recommendations?: string[];
        }[];
    };
}

export async function getLatestDataBatch(): Promise<SampleDatasetItem[]> {
    const queriesCollection = collection(db, 'queries');
    // Get the single most recent document to find the latest date
    const qLatest = query(queriesCollection, orderBy('date', 'desc'), limit(1));
    const latestSnapshot = await getDocs(qLatest);

    if (latestSnapshot.empty) return [];

    const latestDoc = latestSnapshot.docs[0].data();
    let latestDateStr = latestDoc.date;

    // Normalize date to string if it's a Firestore Timestamp
    if (latestDateStr && typeof latestDateStr.toDate === 'function') {
        latestDateStr = latestDateStr.toDate().toISOString();
    }

    if (typeof latestDateStr !== 'string') {
        console.warn("latestDate is not a string, using ISO fallback:", latestDateStr);
        latestDateStr = new Date().toISOString();
    }

    // We'll treat symbols from the same day as the same batch for analysis
    // Or if they have a batch_id, we use that.
    if (latestDoc.batch_id) {
        const qBatch = query(queriesCollection, where('batch_id', '==', latestDoc.batch_id));
        const batchSnapshot = await getDocs(qBatch);
        return batchSnapshot.docs.map(doc => {
            const d = doc.data();
            const date = d.date && typeof d.date.toDate === 'function' ? d.date.toDate().toISOString() : d.date;
            return { _id: doc.id, ...d, date } as SampleDatasetItem;
        });
    } else {
        // Fallback: all from the same day
        const dayStart = latestDateStr.split('T')[0];
        const allDocs = await getDocs(queriesCollection);
        return allDocs.docs
            .map(doc => {
                const d = doc.data();
                const date = d.date && typeof d.date.toDate === 'function' ? d.date.toDate().toISOString() : d.date;
                return { _id: doc.id, ...d, date } as SampleDatasetItem;
            })
            .filter(d => d.date?.startsWith(dayStart));
    }
}

export async function saveStrategicReport(report: Omit<StrategicReport, '_id'>) {
    const reportsCollection = collection(db, 'strategic_reports');
    const docRef = await addDoc(reportsCollection, report);
    return docRef.id;
}

export async function fetchLatestStrategicReport(): Promise<StrategicReport | null> {
    const reportsCollection = collection(db, 'strategic_reports');
    const q = query(reportsCollection, orderBy('generatedAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return { _id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as StrategicReport;
}

export function aggregateDataForAi(items: SampleDatasetItem[]) {
    const clustersMap = new Map<string, {
        name: string,
        totalPrompts: number,
        geniallyMentions: number,
        positions: number[],
        sentiments: number[],
        features: Set<string>,
        competitorFeatures: Set<string>
    }>();

    // Group by cluster
    const uniquePromptsPerCluster = new Map<string, Set<string>>();

    items.forEach(item => {
        const cluster = item.keyword || 'General';
        if (!uniquePromptsPerCluster.has(cluster)) {
            uniquePromptsPerCluster.set(cluster, new Set());
        }
        uniquePromptsPerCluster.get(cluster)!.add(item.prompt || '');

        if (!clustersMap.has(cluster)) {
            clustersMap.set(cluster, {
                name: cluster,
                totalPrompts: 0,
                geniallyMentions: 0,
                positions: [],
                sentiments: [],
                features: new Set(),
                competitorFeatures: new Set()
            });
        }

        const stats = clustersMap.get(cluster)!;

        try {
            const tools = JSON.parse(item.json_content || '[]');
            let hasGenially = false;

            tools.forEach((t: any) => {
                const name = normalizeBrandName(t.name || t.nombre);
                if (name === 'Genially') {
                    hasGenially = true;
                    stats.geniallyMentions++;
                    if (t.position) stats.positions.push(Number(t.position));
                    if (t.sentiment !== undefined) stats.sentiments.push(Number(t.sentiment));
                    if (Array.isArray(t.features)) t.features.forEach((f: string) => stats.features.add(f));
                } else {
                    // Competitor features for gap analysis
                    if (Array.isArray(t.features)) t.features.forEach((f: string) => stats.competitorFeatures.add(f));
                }
            });
        } catch { }
    });

    // Final aggregation
    return Array.from(clustersMap.values()).map(c => {
        const totalClusterPrompts = uniquePromptsPerCluster.get(c.name)?.size || 1;
        return {
            name: c.name,
            sov: (c.geniallyMentions / totalClusterPrompts) * 100,
            avgPos: c.positions.length > 0 ? c.positions.reduce((a, b) => a + b, 0) / c.positions.length : 0,
            avgSentiment: c.sentiments.length > 0 ? c.sentiments.reduce((a, b) => a + b, 0) / c.sentiments.length : 0,
            geniallyFeatures: Array.from(c.features).slice(0, 10),
            competitorFeatures: Array.from(c.competitorFeatures).filter(f => !c.features.has(f)).slice(0, 10)
        };
    });
}
