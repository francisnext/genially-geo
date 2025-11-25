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
                date: docData.date,
                content: docData.content,
            } as SampleDatasetItem;
        });

        return data;
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        throw error;
    }
}
