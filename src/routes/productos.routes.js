import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/', authMiddleware,ProductoController.getAll);          // GET /api/products
router.get('/:id', authMiddleware,ProductoController.getById);      // GET /api/products/:id
router.post('/create', authMiddleware,ProductoController.create);   // POST /api/products/create
router.delete('/:id',authMiddleware, ProductoController.delete);    // DELETE /api/products/:id

export default router;