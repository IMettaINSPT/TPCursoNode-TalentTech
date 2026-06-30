import { UserModel } from '../models/usuario.model.js';
import jwt from 'jsonwebtoken';

export const AuthService = {
    /**
     * Valida credenciales contra DB y emite un JWT
     * @param {string} email 
     * @param {string} password 
     * @returns {string} Token JWT firmado
     */
    async login(email, password) {
        // 1. Buscamos el usuario en la base de datos a través del modelo
        const user = await UserModel.getByEmail(email);

        // 2. Si el usuario no existe o la contraseña no coincide, lanzamos un 401
        // (Nota: para el alcance del proyecto, la comparación en texto plano cumple perfecto)
        if (!user || user.password !== password) {
            const error = new Error('Credenciales inválidas. El correo o la contraseña son incorrectos.');
            error.statusCode = 401; 
            throw error;
        }

        // 3. Si las credenciales son válidas, armamos el payload para el JWT
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name || 'Usuario'
            }
        };

        // 4. Firmamos el token 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        return token;
    }
};