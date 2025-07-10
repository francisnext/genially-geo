import sampleDatasetJson from "@/data/sample-dataset.json";

interface Debilidad {
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
}

interface Estrategia {
  accion: string;
  coste: string;
  prioridad: "alta" | "media" | "baja";
}

export interface MarcaMencionada {
  marca: string
  sentimiento: number
  highlights: string[]
  pros: string[]
  cons: string[]
  sources?: string[]
}

export interface Tool {
  name?: string
  sentiment?: number
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  sources?: string[]
  // Propiedades alternativas en español
  nombre?: string
  sentimiento?: number
  contras?: string[]
}

export interface QueryData {
  _id: string
  _name?: string
  _createTime?: string
  _updateTime?: string
  menciona_marca?: boolean
  menciona_dominio?: boolean | null
  marcasMencionadas?: MarcaMencionada[]
  tools?: Tool[]
  query: string
  fecha: string
  ia: string
  respuesta?: string | null
  // Campos adicionales
  marcaMencionada?: string
  dominioMencionado?: string
  sentimiento?: number
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  sources?: string[]
}

// Dataset preconfigurado para pruebas
export const SAMPLE_DATASET: QueryData[] = sampleDatasetJson as QueryData[];

// Función para obtener estadísticas del dataset
export const getDatasetStats = () => {
  const totalRecords = SAMPLE_DATASET.length
  const recordsWithBrands = SAMPLE_DATASET.filter((item) => item.menciona_marca).length
  const recordsWithGenially = SAMPLE_DATASET.filter((item) =>
    item.marcasMencionadas?.some((marca) => marca.marca.toLowerCase().includes("genially")),
  ).length

  const uniqueQueries = new Set(SAMPLE_DATASET.map((item) => item.query.toLowerCase())).size
  const uniqueBrands = new Set(
    SAMPLE_DATASET.filter((item) => item.marcasMencionadas)
      .flatMap((item) => item.marcasMencionadas!)
      .map((marca) => marca.marca),
  ).size

  return {
    totalRecords,
    recordsWithBrands,
    recordsWithGenially,
    uniqueQueries,
    uniqueBrands,
    geniallyMarketShare: recordsWithBrands > 0 ? (recordsWithGenially / recordsWithBrands) * 100 : 0,
  }
}

