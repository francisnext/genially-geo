# 🤖 AI Development Context: Genially GEO Intelligence

This document provides critical context for AI agents assisting in the development of the Genially GEO project. Reference this file to understand the architecture, data flow, and core objectives.

---

## 🎯 Project Core Objective
**Genially GEO** (Generative Engine Optimization) is a tool designed to analyze and optimize how Genially is perceived and recommended by AI Search Engines (ChatGPT Search, Gemini, SearchGPT).

The goal is to increase Genially's **Share of Voice (SoV)** and improve its **Average Position** in AI-generated recommendations.

---

## 🏛️ Architecture & Tech Stack

### Frontend & Backend
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **Styling**: Tailwind CSS + Shadcn UI (Radix).
- **State Management**: React Hooks (useState/useEffect) + Server Actions for database/LLM interaction.

### Data Layer
- **Primary Database**: Firebase Firestore.
- **Collections**:
  - `queries`: Stores individual AI responses for keywords.
  - `strategic_reports`: Stores AI-generated SWOT/Strategy reports based on latest extractions.
- **Local Data**: `data/Queries a analizar en GEO - Queries.csv` acts as the primary source for batch processing.

### AI Integration (`/lib/llm`)
- **Multi-Client System**: Uses a `LLMFactory` to instantiate clients for:
  - `OpenAIClient`: GPT-4o for ChatGPT logic.
  - `GeminiClient`: Gemini 1.5 Flash.
  - `SearchGPTClient`: Simulates browser-based AI search logic.
- **Protocol**: All LLM responses are forced into a structured JSON schema via system prompts to ensure consistent parsing of:
  - `tools`: Array of recommended brands/products.
  - `sources`: URLs cited by the AI.
  - `sentiment`: Numeric value of the recommendation.

---

## 📊 Key Metrics & Logic

### 1. Share of Voice (SoV)
Calculated as the percentage of times "Genially" (or its domain `genially.com`) appears in the recommendations compared to total possible mentions.
- **Formula**: `(Genially Mentions / Total Recommendations) * 100`

### 2. Posición (cuando aparece)
The numeric rank (1-based) where Genially is mentioned in the AI's response list. Lower is better. This metric ONLY accounts for instances where Genially is actually mentioned. If not mentioned, it is treated as null (or `-` in the UI).

### 3. Keyword Clustering
Keywords are grouped by `cluster` (e.g., "Educación", "Diseño"). Most charts and reports aggregate data at this cluster level.

### 4. Batch ID Logic
Each time "Ejecutar Lote GEO" is clicked, a unique `batchId` (timestamp-based) is generated. This allows the dashboard to filter for the **latest extraction** rather than mixing historical averages.

---

## 📁 Source Code Map (Critical Paths)

- **`app/actions/analyze-keyword.ts`**: The main orchestrator for single/bulk keyword processing.
- **`app/actions/strategic-analysis.ts`**: Logic for aggregating data and sending it to an LLM to generate a SWOT report.
- **`lib/firestore-service.ts`**: CRUD operations for the `queries` collection.
- **`components/AnalyticsCharts.tsx`**: Recharts implementation for SoV and Position tracking.
- **`data/`**: Storage for CSVs and seed data.

---

## 💡 Guidelines for AI Agents

1. **Strict JSON**: When modifying LLM prompts (in `actions`), always ensure the `response_format: { type: "json_object" }` is maintained.
2. **Server Actions**: Prefer Server Actions for data fetching/mutations over client-side Firestore calls when possible for better security and SEO.
3. **Domain Normalization**: Always use `genially.com` for comparison logic. AI models might return "Genially", "Genially.ly", or "app.genially", so normalization in `lib/utils.ts` or during parsing is key.
4. **Hydration**: Be careful with `use client` components; ensure global metrics are passed from server components or fetched via robust loading states.

---

*Last Updated: 2026-01-21*
