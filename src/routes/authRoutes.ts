import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const authRoutes = Router();
const controller = new AuthController();

authRoutes.get('/login', controller.login);
authRoutes.post('/register', controller.register);
authRoutes.get('/redirect/', controller.oauth);
export default authRoutes;
