import { OpenAIClient } from './openai-client';
import { GeminiClient } from './gemini-client';
import { SearchGPTClient } from './searchgpt-client';
import { LLMClient } from './types';

export class LLMFactory {
    static createClients(): LLMClient[] {
        const clients: LLMClient[] = [];

        if (process.env.OPENAI_API_KEY) {
            clients.push(new OpenAIClient());
            clients.push(new SearchGPTClient());
        }

        if (process.env.GOOGLE_API_KEY) {
            clients.push(new GeminiClient());
        }

        // Add other clients here as needed

        return clients;
    }
}
