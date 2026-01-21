'use client';

import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

export async function cleanupBadMappings() {
    try {
        const queriesCollection = collection(db, 'queries');
        const snapshot = await getDocs(queriesCollection);

        const batch = writeBatch(db);
        let count = 0;

        snapshot.forEach((document) => {
            const data = document.data();
            const keyword = data.keyword || "";
            const dateValue = data.date;
            let dateStr = "";
            if (typeof dateValue === 'string') {
                dateStr = dateValue;
            } else if (dateValue && typeof dateValue.toDate === 'function') {
                dateStr = dateValue.toDate().toISOString();
            }

            // Criterios de limpieza: 
            // 1. Mapeos erróneos (prompt en cluster)
            const isActuallyAPrompt = (keyword.split(' ').length > 4) || keyword.includes('?');
            // 2. Registros de ayer y hoy (16 y 17 de enero 2026)
            const isRecent = dateStr.includes('2026-01-16') || dateStr.includes('2026-01-17');
            // 3. Registros de prueba
            const isTest = keyword === 'Test-Cluster';
            // 4. Cluster 'Others' (plural) - el usuario quiere borrar el plural, dejar el singular 'other'
            const isOthersPlural = keyword.toLowerCase() === 'others';
            // EXCEPCIÓN: Si es 'other' (singular), lo dejamos a menos que sea un mapeo erróneo (prompt en cluster)
            const isOtherSingular = keyword.toLowerCase() === 'other';

            if ((isActuallyAPrompt || isRecent || isTest || isOthersPlural) && !isOtherSingular) {
                batch.delete(document.ref);
                count++;
            }
        });

        if (count > 0) {
            await batch.commit();
            return { success: true, count };
        }

        return { success: true, count: 0 };
    } catch (error) {
        console.error("Cleanup error:", error);
        throw error;
    }
}
