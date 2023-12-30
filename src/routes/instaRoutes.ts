import { Router } from 'express';
import { InstaController } from '../controllers/instaController';
import { AuthMiddleware } from '../middleware/authenticationMiddleware';

const router = Router();
const controller = new InstaController();
const authMiddleware = new AuthMiddleware();

router.post('/getLiveLongToken', authMiddleware.isAuthenticated, controller.getLiveLongToken);
router.post('/getInstaProfileDetail', authMiddleware.isAuthenticated, controller.getInstaProfileDetail);
router.post('/getPostDetail', authMiddleware.isAuthenticated, controller.getPostDetail);

export default router;
