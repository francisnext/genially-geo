const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit, query } = require('firebase/firestore');

// 1. Manually load .env.local
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes if any
                process.env[key] = value;
            }
        });
        console.log('✅ Loaded .env.local');
    } else {
        console.error('❌ .env.local not found!');
        process.exit(1);
    }
} catch (e) {
    console.error('Error reading .env.local', e);
}

// 2. Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('Configuration used (partial):');
console.log(' - Project ID:', firebaseConfig.projectId);
console.log(' - Auth Domain:', firebaseConfig.authDomain);
// Don't log the full API key for security, just length
console.log(' - API Key Length:', firebaseConfig.apiKey ? firebaseConfig.apiKey.length : 0);

try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // 3. Test Connection
    console.log('🔄 Attempting to fetch 1 document from "queries" collection...');

    async function testConnection() {
        try {
            const q = query(collection(db, 'queries'), limit(1));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log('✅ Connection Successful! (But collection is empty)');
            } else {
                console.log(`✅ Connection Successful! Found ${snapshot.size} document(s).`);
                console.log('Sample Doc ID:', snapshot.docs[0].id);
            }
        } catch (error) {
            console.error('❌ Connection Failed:', error.message);
            if (error.code) console.error('Error Code:', error.code);
        }
    }

    testConnection();

} catch (error) {
    console.error('❌ Initialization Failed:', error);
}
