import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { SampleDatasetItem } from '@/data/sample-dataset';


export async function fetchQueriesFromFirestore(): Promise<SampleDatasetItem[]> {
    try {
        const queriesCollection = collection(db, 'queries');
        const querySnapshot = await getDocs(queriesCollection);

        const data: SampleDatasetItem[] = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            return {
                _id: doc.id,
                priority: docData.priority,
                keyword: docData.keyword,
                json_content: docData.json_content,
                category: docData.category,
                ia: docData.ia,
                prompt: docData.prompt,
                sources: docData.sources,
                date: docData.date && typeof docData.date.toDate === 'function'
                    ? docData.date.toDate().toISOString()
                    : docData.date,
                content: docData.content,
                batch_id: docData.batch_id,
            } as SampleDatasetItem;
        });

        return data;
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        throw error;
    }
}

import { addDoc } from 'firebase/firestore';

export async function saveQueryToFirestore(item: Omit<SampleDatasetItem, '_id'>): Promise<string> {
    try {
        const queriesCollection = collection(db, 'queries');
        const docRef = await addDoc(queriesCollection, item);
        return docRef.id;
    } catch (error) {
        console.error('Error saving data to Firestore:', error);
        throw error;
    }
}

import { query, where, orderBy, limit } from 'firebase/firestore';

export async function fetchLatestBatchByKeyword(keyword: string): Promise<SampleDatasetItem[]> {
    try {
        const queriesCollection = collection(db, 'queries');
        // Primero obtenemos el batch_id más reciente para esta keyword
        const qLatest = query(
            queriesCollection,
            where('keyword', '==', keyword),
            orderBy('date', 'desc'),
            limit(1)
        );
        const latestSnapshot = await getDocs(qLatest);
        if (latestSnapshot.empty) return [];

        const latestDoc = latestSnapshot.docs[0].data();
        const latestBatchId = latestDoc.batch_id;

        // Ahora traemos todos los de ese batch
        const qBatch = query(
            queriesCollection,
            where('keyword', '==', keyword),
            where('batch_id', '==', latestBatchId)
        );
        const batchSnapshot = await getDocs(qBatch);

        return batchSnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data(),
            date: doc.data().date && typeof doc.data().date.toDate === 'function'
                ? doc.data().date.toDate().toISOString()
                : doc.data().date,
        } as SampleDatasetItem));
    } catch (error) {
        console.error('Error fetching latest batch:', error);
        return [];
    }
}
