import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { html, queries, sitemap, competencia } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No API key configured" }, { status: 500 });
  }

  // Construir el prompt dinámicamente
  const prompt = `Eres un experto en SEO y análisis de contenidos. Analiza el siguiente documento HTML y responde en JSON estructurado según este esquema:

{
  idioma: string,
  keywords_por_query: { [query: string]: string[] },
  chunks: [
    { heading: string, resumen: string, extension_palabras: number, recomendaciones: string[], debil: boolean }
  ],
  cobertura: { temas_cubiertos: string[], faltantes: string[], comentario: string },
  canibalizacion: [ { url: string, keywords_competidas: string[] } ],
  onpage: {
    titulo: { valor: string, sugerencia: string },
    meta_description: { valor: string, sugerencia: string },
    headings: { estructura: string[], sugerencia: string },
    imagenes: { alt_faltantes: number, sugerencia: string },
    enlaces: { internos: number, externos: number, sugerencia: string },
    densidad_keywords: { valor: number, sugerencia: string },
    longitud: { palabras: number, sugerencia: string }
  },
  comparativa_competencia: [
    { url: string, cobertura: string, keywords: string[], comentario: string }
  ]
}

- Detecta automáticamente el idioma y responde en ese idioma.
- Sugiere un máximo de 10 keywords secundarias por query objetivo, seleccionando solo las más relevantes.
- Divide el contenido en chunks temáticos, con heading, resumen, extensión y recomendaciones.
- Analiza la cobertura de temas y señala faltantes.
- Si se proporciona sitemap, detecta canibalización de keywords SOLO entre las URLs presentes en el sitemap proporcionado. No inventes URLs.
- Sugiere mejoras on-page (título, meta, headings, imágenes, enlaces, densidad, longitud). Si no hay sugerencias específicas, omite los apartados de headings, imágenes y enlaces.
- Identifica contenido débil o relleno.
- Si se proporcionan URLs de competencia, analiza el contenido real de esas URLs (no inventes el contenido) y compara los temas cubiertos y faltantes respecto al contenido analizado. Si no se proporcionan URLs de competencia, omite la sección de comparativa.
- No incluyas sugerencias genéricas como "añade más h2/h3", "añade alt", "añade enlaces" si no hay datos concretos.

HTML a analizar:
${html}

Queries objetivo:
${Array.isArray(queries) ? queries.join(", ") : queries}

${sitemap ? `Sitemap:\n${sitemap}` : ''}
${competencia && competencia.length ? `\nCompetencia:\n${competencia.join(", ")}` : ''}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Eres un asistente SEO experto en análisis de contenido web orientado a LLMs." },
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.3
    }),
  });
  const data = await res.json();
  // Intentar extraer solo el JSON de la respuesta de la IA
  let jsonResult = null;
  try {
    const match = data.choices?.[0]?.message?.content?.match(/\{[\s\S]*\}/);
    if (match) {
      jsonResult = JSON.parse(match[0]);
    }
  } catch (e) {}
  return NextResponse.json(jsonResult || data);
} 