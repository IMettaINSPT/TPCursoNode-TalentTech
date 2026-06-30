import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();

// POST /api/auth/login (Recibe email y password)
router.post('/login', AuthController.login);

export default router;