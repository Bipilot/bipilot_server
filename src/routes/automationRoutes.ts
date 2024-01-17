import { Router } from 'express';
import { AutomationController } from '../controllers/automationController';
import { AuthMiddleware } from '../middleware/authenticationMiddleware';

const router = Router();
const controller = new AutomationController();
const authMiddleware = new AuthMiddleware();

router.get('/bind', authMiddleware.isVerifiedWebhook, controller.bindWebhooks);
router.post('/bind', authMiddleware.isAuthenticated, controller.runAutomation);

export default router;
