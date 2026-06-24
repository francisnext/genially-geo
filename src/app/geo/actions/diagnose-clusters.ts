'use server';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/geo/firebase';

export async function diagnoseClusters() {
    try {
        // Obtener primeros 5 documentos para inspeccionar estructura
        const queriesRef = collection(db, 'queries');
        const q = query(queriesRef, limit(5));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return {
                success: false,
                message: 'No hay documentos en la colecciÃ³n "queries"'
            };
        }

        const sampleDocs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            fields: Object.keys(doc.data()),
            data: doc.data()
        }));

        // Contar total de documentos
        const allDocs = await getDocs(queriesRef);
        
        return {
            success: true,
            totalDocuments: allDocs.size,
            sampleDocuments: sampleDocs,
            message: `Total de documentos: ${allDocs.size}. Estructura de ejemplo con los campos disponibles:`
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}