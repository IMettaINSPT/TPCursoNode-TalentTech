import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // 1. Obtener el header de Authorization
    const authHeader = req.headers['authorization'];

    // Si NO hay token, respondemos DIRECTO acá con 401
    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            error: 'Acceso denegado. No se proporcionó un token de autenticación.'
        });
    }

    // 2. Validar formato "Bearer"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            status: 401,
            error: 'Formato de token inválido. Debe ser del tipo "Bearer <TOKEN>".'
        });
    }

    const token = parts[1];

    // 3. Verificar el token de forma segura
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // add user 
        next(); // Token ok
    } catch (err) {
    
        return res.status(403).json({
            status: 403,
            error: 'Token inválido o expirado. Autenticación fallida.'
        });
    }
};