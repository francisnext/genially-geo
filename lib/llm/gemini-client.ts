import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMClient, LLMResponse } from './types';

export class GeminiClient implements LLMClient {
    name = 'Gemini';
    private client: GoogleGenerativeAI;

    constructor(apiKey?: string) {
        const key = apiKey || process.env.GOOGLE_API_KEY;
        if (!key) {
            throw new Error("GOOGLE_API_KEY is not defined");
        }
        this.client = new GoogleGenerativeAI(key);
    }

    async generate(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
        const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-pro'];
        let lastError: any = null;

        for (const modelName of modelsToTry) {
            try {
                const model = this.client.getGenerativeModel({
                    model: modelName,
                    systemInstruction: systemPrompt,
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                });

                const result = await model.generateContent(userPrompt);
                const response = await result.response;
                const text = response.text();

                let parsedJson;
                try {
                    const cleanJson = text.replace(/```[a-z]*\n?|\n?```/gi, '').trim();
                    parsedJson = JSON.parse(cleanJson);
                } catch (e) {
                    console.warn(`Failed to parse ${modelName} JSON response:`, e);
                }

                return {
                    tool: this.name,
                    model: modelName,
                    response: text,
                    json: parsedJson,
                    usage: response.usageMetadata ? {
                        promptTokens: response.usageMetadata.promptTokenCount,
                        completionTokens: response.usageMetadata.candidatesTokenCount,
                        totalTokens: response.usageMetadata.totalTokenCount
                    } : undefined
                };
            } catch (error: any) {
                lastError = error;
                console.warn(`Gemini model ${modelName} failed:`, error.message);
                if (error.status && error.status !== 404) break;
                continue;
            }
        }

        console.error('Gemini All Models Failed:', {
            message: lastError.message,
            status: lastError.status,
            details: lastError.errorDetails
        });
        throw new Error(`Gemini All Models Failed: ${lastError.message} (Status: ${lastError.status || 'unknown'})`);
    }
}
