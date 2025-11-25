// Firestore service for debilidades-oportunidades collection
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface DebilidadesOportunidadesItem {
    debilidades?: { descripcion: string; prioridad: "alta" | "media" | "baja" }[];
    estrategias_y_oportunidades?: { accion: string; coste: string; prioridad: "alta" | "media" | "baja" }[];
    // any other fields present in the documents
}

export async function fetchDebilidadesOportunidades(): Promise<DebilidadesOportunidadesItem[]> {
    const colRef = collection(db, "debilidades-oportunidades");
    const snapshot = await getDocs(colRef);
    const data: DebilidadesOportunidadesItem[] = [];
    snapshot.forEach(doc => {
        data.push(doc.data() as DebilidadesOportunidadesItem);
    });
    return data;
}
