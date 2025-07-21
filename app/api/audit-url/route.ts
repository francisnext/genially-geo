import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configurar cliente de Google
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface AuditResult {
  entity: string;
  queries: Array<{
    query: string;
    covered: boolean;
    maxSimilarity: number;
    mostRelevantChunk: string;
  }>;
  totalCoverage: number;
  chunks: {
    title: string[];
    metaDescription: string[];
    headings: string[];
    paragraphs: string[];
    lists: string[];
    divs: string[];
  };
  logs: Array<{
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    details?: string;
  }>;
}

// Función para descargar HTML de una URL
async function fetchHTML(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Error fetching URL: ${error}`);
  }
}

// Función para extraer chunks usando parsing propio de HTML
async function extractChunks(htmlContent: string): Promise<{
  title: string[];
  metaDescription: string[];
  headings: string[];
  paragraphs: string[];
  lists: string[];
  divs: string[];
}> {
  try {
    const title: string[] = [];
    const metaDescription: string[] = [];
    const headings: string[] = [];
    const paragraphs: string[] = [];
    const lists: string[] = [];
    const divs: string[] = [];
    
    // Extraer título de la página
    const titleRegex = /<title[^>]*>(.*?)<\/title>/i;
    const titleMatch = htmlContent.match(titleRegex);
    if (titleMatch && titleMatch[1]) {
      const titleText = titleMatch[1].trim();
      if (titleText && titleText.length > 5) {
        title.push(titleText);
      }
    }
    
    // Extraer meta description
    const metaDescriptionRegex = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i;
    const metaDescriptionMatch = htmlContent.match(metaDescriptionRegex);
    if (metaDescriptionMatch && metaDescriptionMatch[1]) {
      const metaDescriptionText = metaDescriptionMatch[1].trim();
      if (metaDescriptionText && metaDescriptionText.length > 10) {
        metaDescription.push(metaDescriptionText);
      }
    }
    
    // Extraer texto de headings usando regex
    const headingRegex = /<(h[1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const headingMatches = htmlContent.match(headingRegex) || [];
    headingMatches.forEach((heading) => {
      const levelMatch = heading.match(/<h([1-6])/i);
      const level = levelMatch ? levelMatch[1] : 'unknown';
      const text = heading.replace(/<[^>]*>/g, '').trim();
      if (text && text.length > 10) {
        headings.push(`H${level}: ${text}`);
      }
    });
    
    // Extraer texto de párrafos usando regex
    const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gi;
    const paragraphMatches = htmlContent.match(paragraphRegex) || [];
    paragraphMatches.forEach((paragraph) => {
      const text = paragraph.replace(/<[^>]*>/g, '').trim();
      if (text && text.length > 20) {
        paragraphs.push(text);
      }
    });
    
    // Extraer texto de listas usando regex
    const listItemRegex = /<li[^>]*>(.*?)<\/li>/gi;
    const listItemMatches = htmlContent.match(listItemRegex) || [];
    listItemMatches.forEach((item) => {
      const text = item.replace(/<[^>]*>/g, '').trim();
      if (text && text.length > 10) {
        lists.push(text);
      }
    });
    
    // Extraer texto de divs con contenido significativo
    const divRegex = /<div[^>]*>(.*?)<\/div>/gi;
    const divMatches = htmlContent.match(divRegex) || [];
    divMatches.forEach((div) => {
      // Solo considerar divs que no contengan otros elementos estructurales
      const hasStructuralElements = /<(h[1-6]|p|ul|ol|li)[^>]*>/i.test(div);
      if (!hasStructuralElements) {
        const text = div.replace(/<[^>]*>/g, '').trim();
        if (text && text.length > 50 && text.length < 500) {
          divs.push(text);
        }
      }
    });
    
    return {
      title,
      metaDescription,
      headings,
      paragraphs,
      lists,
      divs
    };
  } catch (error) {
    console.error('Error extracting chunks:', error);
    return {
      title: [],
      metaDescription: [],
      headings: [],
      paragraphs: [],
      lists: [],
      divs: []
    };
  }
}

// Función para obtener todos los chunks como array plano para embeddings
function getAllChunks(chunks: {
  title: string[];
  metaDescription: string[];
  headings: string[];
  paragraphs: string[];
  lists: string[];
  divs: string[];
}): string[] {
  return [
    ...chunks.title.map(t => `Título: ${t}`),
    ...chunks.metaDescription.map(m => `Meta descripción: ${m}`),
    ...chunks.headings,
    ...chunks.paragraphs,
    ...chunks.lists,
    ...chunks.divs
  ];
}

// Función para extraer entidad principal usando Gemini
async function extractEntity(chunks: string[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const sampleText = chunks.slice(0, 3).join(' ').slice(0, 200);
  const prompt = `Analiza el siguiente contenido y responde únicamente con el nombre de la entidad principal (una sola palabra o frase corta, sin comas, sin listas, sin explicaciones, sin conectores). La respuesta debe estar en el mismo idioma que el texto proporcionado. Si hay varias entidades, elige una, la más relevante.

Contenido:
${chunks.slice(0, 5).join('\n\n')}

Respuesta (solo una entidad, sin comas, sin listas):`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Post-procesado más estricto
    let entity = response.text().trim().split('\n')[0];
    if (entity.includes(',')) entity = entity.split(',')[0].trim();
    if (entity.includes(' y ')) entity = entity.split(' y ')[0].trim();
    if (entity.includes(' o ')) entity = entity.split(' o ')[0].trim();
    if (entity.includes('/')) entity = entity.split('/')[0].trim();
    return entity;
  } catch (error) {
    console.error('Error extracting entity:', error);
    return 'Entidad no detectada';
  }
}

// Función para generar consultas sintéticas usando Gemini
async function generateQueries(entity: string): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Genera 5 preguntas que una IA de búsqueda como Google podría hacer sobre "${entity}". Las preguntas deben ser específicas y variadas, cubriendo diferentes aspectos como características, beneficios, comparaciones, etc.\n\nFormato: devuelve solo las 5 preguntas, una por línea, sin numeración.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const queries = response.text().split('\n').filter(q => q.trim()).slice(0, 5);
    return queries;
  } catch (error: any) {
    // Manejo de error amigable para modelo saturado
    if (typeof error.message === 'string' && error.message.includes('model is overloaded')) {
      throw new Error('El modelo de Gemini está temporalmente saturado. Por favor, inténtalo de nuevo en unos minutos.');
    }
    throw error;
  }
}

// Función para obtener embeddings usando Gemini
async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  
  const embeddings: number[][] = [];
  
  for (const text of texts) {
    try {
      const result = await model.embedContent(text);
      const embedding = result.embedding;
      embeddings.push(embedding.values);
    } catch (error) {
      console.error('Error getting embedding:', error);
      // Fallback: embedding de ceros
      embeddings.push(new Array(768).fill(0));
    }
  }
  
  return embeddings;
}

// Función para calcular similitud coseno
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (normA * normB);
}

// Nueva función para extraer entidades usando la API pública de Gemini
type GeminiEntityResult = {
  entities: string[];
  raw: string;
  error?: string;
};

async function extractEntitiesWithGemini(text: string): Promise<GeminiEntityResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Extrae las entidades principales de este contenido para el posicionamiento SEO. Devuelve solo una lista de entidades, una por línea.\n\nContenido:\n${text.slice(0, 6000)}\n\nLista de entidades:`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text().trim();
    const entities = raw.split('\n').map(e => e.trim()).filter(e => e.length > 0);
    return { entities, raw };
  } catch (error) {
    return { entities: [], raw: '', error: error instanceof Error ? error.message : String(error) };
  }
}

export async function POST(request: NextRequest) {
  const logs: Array<{type: 'info' | 'success' | 'error' | 'warning'; message: string; details?: string}> = [];
  
  const addLog = (type: 'info' | 'success' | 'error' | 'warning', message: string, details?: string) => {
    logs.push({ type, message, details });
  };

  try {
    addLog('info', 'API endpoint called');
    
    const body = await request.json();
    const url = body.url;
    const text = body.text;
    
    if (!url && !text) {
      return NextResponse.json({ error: 'Debes proporcionar una URL o un texto para auditar.' }, { status: 400 });
    }

    let htmlContent = '';
    if (text) {
      addLog('info', 'Procesando texto manual proporcionado por el usuario');
      htmlContent = text;
    } else {
      addLog('info', 'Processing URL', url);
      // Verificar variables de entorno
      if (!process.env.GEMINI_API_KEY) {
        addLog('error', 'GEMINI_API_KEY not found');
        return NextResponse.json({ error: 'GEMINI_API_KEY not configured', logs }, { status: 500 });
      }
      addLog('success', 'Environment variables verified');
      // 1. Descargar HTML
      addLog('info', 'Fetching HTML from URL');
      htmlContent = await fetchHTML(url);
      addLog('success', 'HTML fetched successfully', `Length: ${htmlContent.length} characters`);
    }

    // 2. Extraer chunks usando parsing propio
    addLog('info', 'Extracting chunks using custom HTML parser');
    const categorizedChunks = await extractChunks(htmlContent);
    const allChunks = getAllChunks(categorizedChunks);
    
    const totalChunks = allChunks.length;
    addLog('success', 'Chunks extracted successfully', `Total: ${totalChunks} chunks (Títulos: ${categorizedChunks.title.length}, Meta: ${categorizedChunks.metaDescription.length}, Headings: ${categorizedChunks.headings.length}, Párrafos: ${categorizedChunks.paragraphs.length}, Listas: ${categorizedChunks.lists.length}, Divs: ${categorizedChunks.divs.length})`);

    // 3. Extraer entidades con Gemini API pública
    addLog('info', 'Extracting entities using Gemini API pública');
    const joinedText = allChunks.join('\n');
    const geminiEntities = await extractEntitiesWithGemini(joinedText);
    if (geminiEntities.error) {
      addLog('error', 'Gemini entity extraction failed', geminiEntities.error);
    } else {
      addLog('success', 'Entities extracted with Gemini', geminiEntities.entities.join(', '));
    }

    // 4. Generar consultas sintéticas
    addLog('info', 'Generating synthetic queries using Gemini');
    let queries: string[] = [];
    try {
      queries = await generateQueries(geminiEntities.entities.join(', '));
      addLog('success', 'Queries generated successfully', `Generated ${queries.length} queries`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido al generar queries';
      addLog('error', 'Error generando queries', msg);
      queries = [];
    }

    // 5. Obtener embeddings
    addLog('info', 'Getting embeddings for queries and chunks');
    const [queryEmbeddings, chunkEmbeddings] = await Promise.all([
      getEmbeddings(queries),
      getEmbeddings(allChunks)
    ]);
    addLog('success', 'Embeddings generated successfully', `Queries: ${queryEmbeddings.length}, Chunks: ${chunkEmbeddings.length}`);

    // 6. Calcular similitud y determinar cobertura
    addLog('info', 'Calculating cosine similarities');
    const queryResults = queries.map((query, queryIndex) => {
      let maxSimilarity = 0;
      let mostRelevantChunkIndex = 0;
      
      chunkEmbeddings.forEach((chunkEmbedding, chunkIndex) => {
        const similarity = cosineSimilarity(queryEmbeddings[queryIndex], chunkEmbedding);
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          mostRelevantChunkIndex = chunkIndex;
        }
      });
      
      return {
        query,
        covered: maxSimilarity >= 0.78,
        maxSimilarity,
        mostRelevantChunk: allChunks[mostRelevantChunkIndex] || 'No chunk available'
      };
    });

    // 7. Calcular cobertura total
    const coveredQueries = queryResults.filter(q => q.covered).length;
    const totalCoverage = (coveredQueries / queries.length) * 100;

    addLog('success', 'Similarity calculations completed', `Covered queries: ${coveredQueries}/${queries.length}`);

    const result: AuditResult & { geminiEntities: GeminiEntityResult } = {
      entity: geminiEntities.entities.join(', '),
      queries: queryResults,
      totalCoverage,
      chunks: categorizedChunks,
      logs,
      geminiEntities
    };

    addLog('success', 'Audit completed successfully', `Total coverage: ${totalCoverage.toFixed(1)}%`);
    return NextResponse.json(result);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    addLog('error', 'Error during audit process', errorMessage);
    
    console.error('Error in audit:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        logs
      },
      { status: 500 }
    );
  }
} 