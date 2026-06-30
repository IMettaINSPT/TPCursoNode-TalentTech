import { db } from '../config/firebase.js'; // Asegurate de que esta ruta apunte a tu inicialización de Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';

export const UserModel = {
    /**
     * Busca un usuario en DB por su email
     * @param {string} email 
     * @returns {Object|null} El usuario encontrado o null si no existe
     */
    async getByEmail(email) {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            // Si no hay documentos que coincidan, retornamos null
            if (querySnapshot.empty) {
                return null;
            }

            // Como el email debería ser único, tomamos el primer documento encontrado
            const doc = querySnapshot.docs[0];
            
            //spread para devol json plano y no por niveles
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            const dbError = new Error('Error al conectar con la base de datos de usuarios.');
            dbError.statusCode = 500;
            throw dbError;
        }
    }
};