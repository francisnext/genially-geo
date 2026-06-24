import OpenAI from 'openai';
import { LLMClient, LLMResponse } from './types';

export class OpenAIClient implements LLMClient {
    name = 'ChatGPT';
    private client: OpenAI;

    constructor(apiKey?: string) {
        this.client = new OpenAI({
            apiKey: apiKey || process.env.OPENAI_API_KEY,
        });
    }

    async generate(systemPrompt: string, userPrompt: string): Promise<LLMResponse> {
        try {
            const completion = await this.client.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                model: 'gpt-4o', // Defaulting to a high capability model, can be made configurable
                response_format: { type: "json_object" }, // Enforcing JSON mode for easier parsing
            });

            const responseContent = completion.choices[0].message.content || '';
            let parsedJson;

            try {
                parsedJson = JSON.parse(responseContent);
            } catch (e) {
                console.warn('Failed to parse OpenAI JSON response:', e);
            }

            return {
                tool: this.name,
                model: completion.model,
                response: responseContent,
                json: parsedJson,
                usage: completion.usage ? {
                    promptTokens: completion.usage.prompt_tokens,
                    completionTokens: completion.usage.completion_tokens,
                    totalTokens: completion.usage.total_tokens,
                } : undefined,
            };
        } catch (error: any) {
            console.error('OpenAI API Error:', error);
            throw new Error(`OpenAI Error: ${error.message}`);
        }
    }
}
