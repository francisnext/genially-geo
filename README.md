# 🌌 Genially GEO Intelligence Suite

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai)](https://openai.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_1.5-4285F4?style=flat-square&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

**Genially GEO** is an advanced analytics platform designed to monitor and optimize Genially's visibility in modern AI-powered search engines. Using **Generative Engine Optimization (GEO)** techniques, the suite provides deep insights into how AI models recommend digital tools.

---

## ✨ Key Features

### � Multi-AI Search Analysis
*   **Deep Integration**: Simultaneous analysis across **ChatGPT Search**, **Google Gemini**, and **SearchGPT/Perplexity-style** interfaces.
*   **Structured Recommendations**: Automatically identifies recommended tools, their positions, features, pros, cons, and pricing models.
*   **Source Tracking**: Captures the authoritative sources cited by AI models to understand the baseline of their recommendations.

### 📊 Advanced Market Intelligence
*   **Share of Voice (SoV)**: Quantify Genially's market presence compared to competitors (Canva, Prezi, PowerPoint, etc.).
*   **Reach & Posición (cuando aparece)**: Monitor average recommendation rankings (only when mentioned) and total presence across keyword clusters.
*   **Sentiment Analysis**: AI-driven sentiment tracking to understand brand perception in natural language responses.

### 📈 Dynamic Analytics & Evolution
*   **Keyword Clustering**: Group analysis by intent (e.g., "Educación", "Corporativo", "Diseño").
*   **Historical Evolution**: Interactive charts tracking SoV and Average Position over time.
*   **SWOT AI Generator**: Automated "Strengths, Weaknesses, Opportunities, and Threats" reports based on live extraction data.

### ⚡ Operational Excellence
*   **Bulk GEO Execution**: Process hundreds of keywords via CSV batch processing.
*   **Real-time Dashboard**: Unified view of the latest extraction metrics and global performance.
*   **Keyword Deep-Dive**: Detailed view for individual queries including specific AI justifications and cited sources.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
-   **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
-   **AI Engine**:
    -   OpenAI GPT-4o (ChatGPT & SearchGPT logic)
    -   Google Gemini 1.5 Flash
-   **Visualizations**: [Recharts](https://recharts.org/)
-   **Forms & Validation**: React Hook Form + Zod

---

## � Getting Started

### 1. Installation
```bash
git clone <repository-url>
cd genially-geo
npm install
```

### 2. Configuration
Create a `.env.local` file in the root directory:
```env
# AI Providers
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_gemini_key

# Firebase Configuration (Vercel/Local)
# Ensure your Firebase Admin or Client SDK is configured for Firestore access.
```

### 3. Loading Data
The application reads keyword clusters and prompts from:
`data/Queries a analizar en GEO - Queries.csv`

Ensure the CSV has the following headers:
- `cluster`: The group/category name.
- `prompts`: The specific query to be sent to the AI.

### 4. Development & Build
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Architecture

```text
genially-geo/
├── app/
│   ├── actions/                # Server Actions (LLM orchestrators)
│   ├── analisis-competidores/  # Competitor benchmarking dashboard
│   ├── cluster/                # Results grouped by category
│   ├── debilidades-oportunidades/ # AI SWOT reports
│   └── page.tsx                # Main dashboard with global metrics
├── components/                 # Atomic UI components & charts
├── data/                       # CSV keyword databases
├── lib/                        
│   ├── llm/                    # Client implementations (OpenAI, Gemini, SearchGPT)
│   └── firestore-service.ts    # Data persistence layer
└── public/                     # Static assets
```

---

## 🎯 Usage Workflow

1.  **Configure**: Add your keywords to the `data/` CSV.
2.  **Trigger**: Navigate to the sidebar and click **"Ejecutar Lote GEO"**.
3.  **Process**: The system will iterate through AI models, parsing structured JSON responses.
4.  **Analyze**: View the aggregated **Share of Voice** in the dashboard or dive into specific **Clusters** for granular insights.
5.  **Strategize**: Use the **Weaknesses & Opportunities** page to refine Genially's GEO strategy.

---

*Developed for Genially Growth & SEO Team.*
