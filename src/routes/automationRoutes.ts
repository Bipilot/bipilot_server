import { Router } from 'express';
import { AutomationController } from '../controllers/automationController';
import { AuthMiddleware } from '../middleware/authenticationMiddleware';

const router = Router();
const controller = new AutomationController();
const authMiddleware = new AuthMiddleware();

router.post('/run', authMiddleware.isAuthenticated, controller.runAutomation);
router.get('/bind', controller.bindWebhooks);

export default router;
