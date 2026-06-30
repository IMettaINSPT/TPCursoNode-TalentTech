import { AuthService } from '../services/auth.service.js';

export const AuthController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // 1. Validación básica de campos obligatorios
            if (!email || !password) {
                const error = new Error('El email y la contraseña son obligatorios.');
                error.statusCode = 400;
                throw error;
            }

            // 2. Delegamos la validación contra Firestore y generación de JWT al Servicio
            const token = await AuthService.login(email, password);

            // 3. Respondemos al cliente con el formato estandarizado
            return res.status(200).json({
                status: 200,
                message: "Autenticación exitosa.",
                token: `Bearer ${token}`
            });

        } catch (error) {
            // Cualquier error de credenciales (401) o de base de datos (500) pasa directo al manejador global
            next(error); 
        }
    }
};