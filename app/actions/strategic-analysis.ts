'use server';

import { LLMFactory } from '@/lib/llm/factory';
import {
    getLatestDataBatch,
    aggregateDataForAi,
    saveStrategicReport,
    fetchLatestStrategicReport
} from '@/lib/strategic-report-service';
import { revalidatePath } from 'next/cache';

const STRATEGIC_SYSTEM_PROMPT = `You are a World-Class Strategic SEO & AI Positioning Expert (GEO Specialist).
Your goal is to analyze Genially's performance data in AI search engines and provide a high-impact strategic report.

You will receive a JSON summary of Genially's presence across different clusters, including:
- SoV (Share of Voice)
- Average Position
- Sentiment
- Features mentioned for Genially
- Key features mentioned for competitors (Gap analysis)

Your report must be strictly valid JSON with this structure:
{
  "summary": "Full executive narrative summary of current positioning (approx 200 words). Spanish language.",
  "clusters": [
    {
      "name": "Cluster Name",
      "sov": number,
      "avgPos": number,
      "sentiment": number,
      "strengths": ["Strong point 1", "Strong point 2"],
      "weaknesses": ["Gap 1", "Issue 2"],
      "sentimentDrivers": {
        "positive": ["Positive factor 1", "Positive factor 2"],
        "negative": ["Negative factor 1", "Negative factor 2"]
      }
    }
  ],
  "actionPlan": [
    {
      "title": "Clear action title",
      "description": "Elaborative description of why and how.",
      "priority": "High" | "Medium" | "Low",
      "term": "plazo corto" | "plazo medio" | "plazo largo",
      "recommendations": [
        "Actionable bullet 1",
        "Actionable bullet 2"
      ]
    }
  ]
}

Tone: Professional, expert, strategic, actionable.
Language: Spanish.
No markdown or text outside the JSON.`;

export async function generateStrategicReportAction() {
    try {
        const rawData = await getLatestDataBatch();
        if (rawData.length === 0) {
            return { success: false, error: 'No hay datos recientes para analizar. Ejecuta un análisis bulk primero.' };
        }

        const aggregated = aggregateDataForAi(rawData);
        const latestDate = rawData[0].date || new Date().toISOString();

        const clients = LLMFactory.createClients();
        const gemini = clients.find(c => c.name === 'Gemini') || clients[0];

        if (!gemini) {
            return { success: false, error: 'No se encontró un cliente de IA configurado.' };
        }

        const userPrompt = `Analiza los siguientes datos del lote del día ${latestDate}:
    ${JSON.stringify(aggregated, null, 2)}
    
    Proporciona un informe experto que ayude a Genially a dominar estos clusters en las respuestas de la IA.`;

        const response = await gemini.generate(STRATEGIC_SYSTEM_PROMPT, userPrompt);

        if (response.json) {
            const reportId = await saveStrategicReport({
                date: latestDate,
                generatedAt: new Date().toISOString(),
                reportContent: response.json as any
            });

            revalidatePath('/debilidades-oportunidades');
            return { success: true, id: reportId };
        } else {
            console.error("AI failed to return JSON:", response.response);
            return { success: false, error: 'La IA no devolvió un formato válido. Inténtalo de nuevo.' };
        }

    } catch (error: any) {
        console.error("Error generating strategic report:", error);
        return { success: false, error: error.message };
    }
}

export async function getLatestStrategicReportAction() {
    try {
        const report = await fetchLatestStrategicReport();
        return { success: true, report };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
