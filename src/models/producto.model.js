import { db } from '../config/firebase.js';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  deleteDoc 
} from 'firebase/firestore';

// 1. Apuntamos a la colección llamada "products" en Firestore
const ProductosDBList = collection(db, 'products');

export const ProductModel = {
    
  // Obtener todos los productos
  async getAll() {
    const querySnapshot = await getDocs(ProductosDBList);
    // Firestore nos da los datos por un lado y el ID automático por otro,
    //  los unimos acá:
    //uso spread para desempaquetar los datos del documento y agrego el id que es único de cada documento
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const productDoc = doc(db, 'products', id);
    const docSnapshot = await getDoc(productDoc);
    
    if (!docSnapshot.exists()) return null;
    return { id: docSnapshot.id, ...docSnapshot.data() };
  },

  
  async create(productData) {
    // addDoc genera el ID en Firestore automáticamente al insertar
    const docRef = await addDoc(ProductosDBList, productData);
    return { id: docRef.id, ...productData };
  },

  
  async delete(id) {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    return true;
  }
};