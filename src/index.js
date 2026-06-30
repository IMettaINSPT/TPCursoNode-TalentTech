import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

// Importamos las rutas de productos y el manejador de errores
import productRoutes from './routes/productos.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

// Cargar las variables de entorno
dotenv.config();
// Inicializar la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares Globales
app.use(cors());
app.use(bodyParser.json());

// 4. Enlazar las Rutas de Productos 
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// 5. Middleware para manejar rutas desconocidas
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: `La ruta ${req.originalUrl} con el método ${req.method} no fue encontrada en este servidor.`
    });
});

// 6. Middleware centralizador de errores globales
app.use(errorMiddleware);

// 7. Encender el servidor (Forma limpia y directa)
const server = app.listen(PORT, () => {
    console.log(`Servidor Express corriendo con éxito en http://localhost:${PORT}`);
});

// Manejador extra por si el puerto está ocupado (esto sí atrapa el error real en consola)
server.on('error', (error) => {
    console.error('Error grave en el servidor Express:', error.message);
});