import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

// Aseguramos la lectura de variables de entorno
dotenv.config();

// Mapeamos el objeto de configuración con lo que guardaste en el .env
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Inicializamos la aplicación base de Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y exportamos la base de datos Firestore lista para usar
export const db = getFirestore(app);

console.log('🔥 Instancia de Firestore inicializada con éxito.');