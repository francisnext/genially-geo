import OpenAI from 'openai';
import { LLMClient, LLMResponse } from './types';

export class SearchGPTClient implements LLMClient {
    name = 'SearchGPT';
    private client: OpenAI;

    constructor(apiKey?: string) {
        const key = apiKey || process.env.OPENAI_API_KEY;
        if (!key) {
            throw new Error("OPENAI_API_KEY is not defined");
        }
        this.client = new OpenAI({ apiKey: key });
    }

    async generate(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
        try {
            // Using the raw fetch or the responses.create if available in the SDK
            // The previous test showed client.responses exists.

            // We combine the system prompt into the input or use instructions if supported.
            // For 'responses' API, instructions might be different.
            // According to working n8n, they just put the prompt in 'input'.
            // To get JSON, we'll append "Return strictly valid JSON" to the input.

            const fullInput = `Instructions: ${systemPrompt}\n\nTask: Analyze the following query and return the JSON results.\n\nQuery: "${userPrompt}"\n\nJSON output should be strictly as specified, with "tools" and "sources" fields.`;

            // Using any to bypass potential type issues with the new 'responses' property
            const response = await fetch('https://api.openai.com/v1/responses', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.client.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    input: fullInput,
                    tools: [{ type: "web_search_preview" }]
                })
            });

            const data = await response.json();

            // Robust extraction from the 'responses' API structure
            let text = "";
            if (data.output && Array.isArray(data.output)) {
                for (const item of data.output) {
                    // Try content array
                    if (item.content && Array.isArray(item.content)) {
                        const textContent = item.content.find((c: any) => c.type === 'text' || c.type === 'output_text');
                        if (textContent && textContent.text) {
                            text = textContent.text;
                            break;
                        }
                    }
                    // Try direct text property (some versions)
                    if (item.text && typeof item.text === 'string') {
                        text = item.text;
                        break;
                    }
                    // Try message property
                    if (item.message && item.message.content) {
                        const textContent = Array.isArray(item.message.content)
                            ? item.message.content.find((c: any) => c.type === 'text' || c.type === 'output_text')
                            : (typeof item.message.content === 'string' ? { text: item.message.content } : null);
                        if (textContent && textContent.text) {
                            text = textContent.text;
                            break;
                        }
                    }
                }
            }

            if (!text) {
                console.warn("[SearchGPT] No text found in response structure. Full data:", JSON.stringify(data).substring(0, 500) + "...");
            }

            // Also check for citations/sources if available in the metadata or context
            // SearchGPT citations are usually inside the text as [1], [2], etc.
            // and the sources are in the 'sources' field of the response or similarly.

            let parsedJson;
            try {
                // Remove markdown code blocks if present
                let cleanJson = text.replace(/```[a-z]*\n?|\n?```/gi, '').trim();

                // If it still doesn't parse, try to find the JSON structure with a regex
                try {
                    parsedJson = JSON.parse(cleanJson);
                } catch (firstError) {
                    // Look for the first { and last } to extract the JSON object
                    const startMatch = cleanJson.indexOf('{');
                    const endMatch = cleanJson.lastIndexOf('}');

                    if (startMatch !== -1 && endMatch !== -1 && endMatch > startMatch) {
                        const potentialJson = cleanJson.substring(startMatch, endMatch + 1);
                        parsedJson = JSON.parse(potentialJson);
                    } else {
                        // Also try to look for an array [ ]
                        const startArr = cleanJson.indexOf('[');
                        const endArr = cleanJson.lastIndexOf(']');
                        if (startArr !== -1 && endArr !== -1 && endArr > startArr) {
                            const potentialJson = cleanJson.substring(startArr, endArr + 1);
                            parsedJson = JSON.parse(potentialJson);
                        } else {
                            throw firstError;
                        }
                    }
                }
            } catch (e) {
                console.warn('Failed to parse SearchGPT JSON response:', e);
                console.warn('Raw text was:', text.substring(0, 300) + "...");
            }

            return {
                tool: this.name,
                model: 'gpt-4o (Search)',
                response: text,
                json: parsedJson,
                usage: data.usage ? {
                    promptTokens: data.usage.input_tokens,
                    completionTokens: data.usage.output_tokens,
                    totalTokens: data.usage.total_tokens
                } : undefined
            };

        } catch (error: any) {
            console.error('SearchGPT API Error:', error);
            throw new Error(`SearchGPT Error: ${error.message}`);
        }
    }
}
