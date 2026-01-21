const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

// Cargar el service account
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error("No se encontró service-account.json");
    process.exit(1);
}
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!serviceAccount) {
    console.error("Error al cargar las credenciales de Firebase.");
    process.exit(1);
}

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function cleanupFirestore() {
    console.log("Iniciando limpieza de Firestore...");
    const queriesRef = db.collection('queries');

    // Obtenemos todos los documentos para analizar el campo 'keyword'
    // Los que tengan un prompt (texto largo con espacios y signos de interrogación) 
    // en el campo 'keyword' deben ser borrados.
    const snapshot = await queriesRef.get();

    let deletedCount = 0;
    const batch = db.batch();

    snapshot.forEach(doc => {
        const data = doc.data();
        const keyword = data.keyword || "";

        // Criterio para detectar si el cluster es en realidad un prompt:
        // - Tiene más de 5 palabras
        // - Contiene signos de interrogación
        // - O es una de las frases largas que vimos en las capturas
        const isActuallyAPrompt = (keyword.split(' ').length > 4) || keyword.includes('?');

        if (isActuallyAPrompt) {
            console.log(`Borrando: ${keyword.substring(0, 50)}...`);
            batch.delete(doc.ref);
            deletedCount++;
        }
    });

    if (deletedCount > 0) {
        await batch.commit();
        console.log(`Limpieza completada. Se borraron ${deletedCount} registros mal mapeados.`);
    } else {
        console.log("No se encontraron registros que necesiten limpieza.");
    }
}

cleanupFirestore().catch(console.error);
