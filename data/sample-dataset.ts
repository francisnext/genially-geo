import { fetchQueriesFromFirestore } from "@/lib/firestore-service";

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
  batch_id?: string;
}

// Cache para los datos de Firestore
let cachedData: SampleDatasetItem[] | null = null;
let isLoading = false;
let loadPromise: Promise<SampleDatasetItem[]> | null = null;

// Función para obtener los datos (con cache)
export async function getSampleDataset(): Promise<SampleDatasetItem[]> {
  // Si ya tenemos datos en cache, devolverlos
  if (cachedData) {
    return cachedData;
  }

  // Si ya hay una carga en progreso, esperar a que termine
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  // Iniciar la carga
  isLoading = true;
  loadPromise = fetchQueriesFromFirestore()
    .then(data => {
      cachedData = data;
      isLoading = false;
      return data;
    })
    .catch(error => {
      console.error('Error loading from Firestore:', error);
      isLoading = false;
      // Re-lanzar el error para que el componente lo maneje
      throw new Error('No se pudieron cargar los datos desde Firestore. Por favor, verifica tu conexión.');
    });

  return loadPromise;
}

// Devuelve un array de keywords únicas presentes en el dataset
export function getUniqueKeywords(dataset?: SampleDatasetItem[]): string[] {
  if (!dataset) return [];
  const keywords = dataset.map(item => item.keyword).filter(Boolean) as string[];
  return Array.from(new Set(keywords));
}
