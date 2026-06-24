export interface LLMResponse {
    tool: string; // "ChatGPT", "Gemini", etc.
    model: string;
    response: string; // Raw text response
    json?: any; // Parsed JSON if applicable
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export interface LLMError {
    tool: string;
    error: string;
    details?: any;
}

export interface LLMClient {
    name: string;
    generate(systemPrompt: string, userPrompt: string): Promise<LLMResponse>;
}
