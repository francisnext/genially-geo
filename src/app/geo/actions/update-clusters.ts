'use server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/geo/firebase';

interface CSVRow {
    cluster?: string;
    prompts?: string;
}

export async function updateClustersFromCSV() {
    try {
        const csvPath = path.join(process.cwd(), 'data', 'Queries a analizar en GEO - Queries.csv');
        
        if (!fs.existsSync(csvPath)) {
            return { success: false, error: `CSV no encontrado en ${csvPath}` };
        }

        const csvData = fs.readFileSync(csvPath, 'utf8');

        // Parsear CSV
        const parsed = Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true
        });

        if (parsed.errors.length > 0) {
            return { success: false, error: `Errores al parsear CSV: ${parsed.errors[0].message}` };
        }

        // Crear mapa de actualizaciones del CSV
        const updates = new Map<string, string>();
        (parsed.data as CSVRow[]).forEach((row) => {
            const prompt = row.prompts?.trim();
            const newCluster = row.cluster?.trim();
            if (prompt && newCluster) {
                updates.set(prompt.toLowerCase(), newCluster);
            }
        });

        console.log(`📋 Leyendo ${updates.size} prompts del CSV...`);

        // Obtener TODOS los documentos de Firestore de una vez
        const queriesRef = collection(db, 'queries');
        const querySnapshot = await getDocs(queriesRef);

        console.log(`🔍 Encontrados ${querySnapshot.size} documentos en Firestore...`);

        let updateCount = 0;
        let noChangeCount = 0;
        const batch = writeBatch(db);

        // Iterar una sola vez sobre los documentos
        querySnapshot.forEach((document) => {
            const data = document.data();
            const keyword = data.keyword || data.prompt || '';
            const currentCluster = data.cluster;
            
            // Buscar el nuevo cluster (case-insensitive)
            const newCluster = updates.get(keyword.toLowerCase());
            
            if (newCluster && currentCluster !== newCluster) {
                console.log(`✅ Actualizando: "${keyword.substring(0, 40)}..." (${currentCluster} → ${newCluster})`);
                batch.update(document.ref, { cluster: newCluster });
                updateCount++;
            } else if (newCluster) {
                noChangeCount++;
            }
        });

        if (updateCount > 0) {
            console.log(`💾 Escribiendo ${updateCount} cambios a Firestore...`);
            await batch.commit();
            console.log(`✅ Batch commit completado`);
        }

        const summary = {
            success: true,
            csvRows: updates.size,
            firestoreDocuments: querySnapshot.size,
            updated: updateCount,
            noChange: noChangeCount,
            message: `✅ Actualización completada: ${updateCount} actualizados, ${noChangeCount} sin cambios.`
        };

        console.log(summary.message);
        return summary;
    } catch (error: any) {
        console.error('❌ Error en updateClustersFromCSV:', error);
        return { success: false, error: error.message };
    }
}
