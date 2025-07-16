import sampleDatasetJson from "@/data/sample-dataset.json";

// Nuevo tipo basado en la estructura real del JSON
export interface SampleDatasetItem {
  _id: string;
  priority?: string;
  keyword?: string;
  json_content?: string;
  category?: string;
  ia?: string;
  prompt?: string;
  sources?: string;
  date?: string;
  content?: string;
}

export const SAMPLE_DATASET: SampleDatasetItem[] = sampleDatasetJson as SampleDatasetItem[];

// Devuelve un array de keywords únicas presentes en el dataset
export function getUniqueKeywords(): string[] {
  const keywords = SAMPLE_DATASET.map(item => item.keyword).filter(Boolean) as string[];
  return Array.from(new Set(keywords));
}

