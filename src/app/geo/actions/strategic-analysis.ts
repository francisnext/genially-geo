'use server';

import { LLMFactory } from '@/lib/geo/llm/factory';
import {
    getLatestDataBatch,
    aggregateDataForAi,
    saveStrategicReport,
    fetchLatestStrategicReport,
    fetchStrategicReportHistory
} from '@/lib/geo/strategic-report-service';
import { revalidatePath } from 'next/cache';

const STRATEGIC_SYSTEM_PROMPT = `You are a strategic advisor reporting to a Head of Product and Head of Marketing at Genially.
Your goal is to translate AI search performance data into clear business insights they can act on immediately.

You will receive a JSON summary of Genially's presence across different topic clusters in AI search engines, including:
- SoV (Share of Voice): % of AI responses that mention Genially
- Average Position
- Sentiment score
- Features mentioned for Genially vs. competitors (gap analysis)

Your report must be strictly valid JSON with this structure:
{
  "summary": "2-3 paragraph executive summary written for a Head of Product or Marketing — no SEO jargon. Start with the single most important number or finding (e.g. 'Genially aparece en el X% de las respuestas IA esta semana'). Then: where we win and why it matters for the business. Then: where we lose, naming the specific competitor that beats us and what they do better. End with the ONE most urgent action. Use plain Spanish. No bullet points — flowing prose. ~150 words max.",
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

Tone: Direct, clear, business-oriented. No technical SEO terms (avoid: GEO, SoV, cluster, sentiment score — translate them into business language).
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
        const chatgpt = clients.find(c => c.name === 'ChatGPT');

        if (!chatgpt) {
            return { success: false, error: 'No se encontró un cliente de ChatGPT/OpenAI configurado. Verifica tu OPENAI_API_KEY.' };
        }

        const userPrompt = `Analiza los siguientes datos del lote del día ${latestDate}:
    ${JSON.stringify(aggregated, null, 2)}

    Proporciona un informe experto que ayude a Genially a dominar estos clusters en las respuestas de la IA.`;

        const response = await chatgpt.generate(STRATEGIC_SYSTEM_PROMPT, userPrompt);

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

export async function getStrategicReportHistoryAction() {
    try {
        const history = await fetchStrategicReportHistory(10);
        return { success: true, history };
    } catch (error: any) {
        return { success: false, error: error.message, history: [] };
    }
}
