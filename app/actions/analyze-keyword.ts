'use server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

import { LLMFactory } from '@/lib/llm/factory';
import { saveQueryToFirestore } from '@/lib/firestore-service';
import { revalidatePath } from 'next/cache';

const SYSTEM_PROMPT = `You are an expert SEO and Market Intelligence analyst.
Your task is to analyze the user's query as if you were a Search Engine (specifically an AI Search Engine like ChatGPT Search or Google Gemini).
You must identify what "tools", "products", or "brands" you would recommend in response to the query.

Return a JSON object with the following structure:
{
  "tools": [
    {
      "name": "Name of the tool",
      "domain": "official-domain.com", // The official root domain of the tool
      "position": 1, // The order in which you would recommend it (1-based)
      "url": "https://website.com/specific-page", // A specific URL or the main page
      "features": ["feature 1", "feature 2"], // Key features relevant to query
      "pros": ["advantage 1", "advantage 2"], // What the AI search engine highlights as POSITIVE
      "cons": ["disadvantage 1", "disadvantage 2"], // What the AI search engine highlights as NEGATIVE or missing
      "pricing": "Free/Paid/Freemium", // Short pricing description
      "sentiment": 1 // A numeric value representing the sentiment (1 = positive, 0 = neutral, -1 = negative)
    }
  ],
  "sources": [
    "https://source1.com/article",
    "https://source2.com/review"
  ]
}

The "domain" field is CRITICAL. Use the root domain (e.g., "genially.com" instead of "app.genially.com").
The "sources" should be real URLs that you would cite as authority for your recommendations.
Strictly valid JSON only. No markdown formatting.`;

import { DEFAULT_KEYWORDS } from '@/lib/llm/config';

export async function analyzeKeyword(keyword: string, prompt?: string, batchId?: string, skipSave: boolean = false) {
    const actualPrompt = prompt || keyword;
    if (!keyword) {
        return { success: false, error: 'Keyword is required' };
    }

    const clients = LLMFactory.createClients();
    if (clients.length === 0) {
        return { success: false, error: 'No LLM clients configured. Please check .env.local' };
    }

    const timestamp = new Date().toISOString();

    try {
        const promises = clients.map(async (client) => {
            try {
                const response = await client.generate(SYSTEM_PROMPT, `Query: "${actualPrompt}"`);

                let jsonContent = '[]';
                let sources = '';
                const parsedData = response.json;

                if (parsedData) {
                    console.log(`[${client.name}] Parsed Data:`, JSON.stringify(parsedData).substring(0, 100) + "...");
                    if (parsedData.tools) {
                        jsonContent = JSON.stringify(parsedData.tools);
                    } else if (Array.isArray(parsedData)) {
                        jsonContent = JSON.stringify(parsedData);
                    }
                    if (parsedData.sources && Array.isArray(parsedData.sources)) {
                        sources = JSON.stringify(parsedData.sources);
                    }
                } else {
                    console.warn(`[${client.name}] No JSON parsed from response:`, response.response.substring(0, 100) + "...");
                }

                const item = {
                    keyword: keyword, // Esto es el Cluster
                    priority: 'High',
                    json_content: jsonContent,
                    category: 'Analyze',
                    ia: response.tool,
                    prompt: actualPrompt, // Esto es la pregunta real
                    sources: sources,
                    date: timestamp,
                    content: response.response,
                    batch_id: batchId || null,
                };

                if (!skipSave) {
                    const id = await saveQueryToFirestore(item);
                    return { success: true, client: client.name, id };
                } else {
                    return { success: true, client: client.name, data: item };
                }

            } catch (err: any) {
                console.error(`Error with ${client.name}:`, err);
                return { success: false, client: client.name, error: err.message };
            }
        });

        const outcomes = await Promise.all(promises);

        revalidatePath(`/cluster/${encodeURIComponent(keyword)}`);
        revalidatePath('/');

        return { success: true, results: outcomes };

    } catch (error: any) {
        console.error('Global Analysis Error:', error);
        return { success: false, error: error.message };
    }
}


export async function getCSVKeywords() {
    const csvPath = path.join(process.cwd(), 'data', 'Queries a analizar en GEO - Queries.csv');
    try {
        if (fs.existsSync(csvPath)) {
            const csvFile = fs.readFileSync(csvPath, 'utf8');
            const parsedCsv = Papa.parse(csvFile, {
                header: true,
                skipEmptyLines: true
            });

            if (parsedCsv.data && parsedCsv.data.length > 0) {
                return (parsedCsv.data as any[])
                    .map(row => ({
                        keyword: row.cluster || row.keyword || '',
                        prompt: row.prompts
                    }))
                    .filter(item =>
                        item.prompt && item.prompt.trim() !== '' &&
                        item.keyword && item.keyword.trim() !== ''
                    );
            }
        }
    } catch (err) {
        console.error("Error al obtener keywords del CSV:", err);
    }
    return DEFAULT_KEYWORDS.map(k => ({ keyword: k, prompt: k }));
}
