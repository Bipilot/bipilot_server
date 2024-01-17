import { Router } from 'express';
import { Account, Automation, Subscribe, Pilot } from '../controllers/instaControllers';
import { AuthMiddleware } from '../middleware/authenticationMiddleware';


const router = Router();
const account = new Account();
const automation = new Automation();
const subscribe = new Subscribe();
const pilot = new Pilot();
const authMiddleware = new AuthMiddleware();


router.get('/oauth_token', authMiddleware.isAuthenticated, pilot.handleAccessToken);
router.get('/Pilot', pilot.getUserProfile);
router.get('/PilotSocial', authMiddleware.isAuthenticated, account.getAllSocialAccounts);
router.get('/AccountActivation', authMiddleware.isAuthenticated, account.accountActivation);
router.get('/AccountDeactivation/:account_id', authMiddleware.isAuthenticated, account.accountDeactivation);
router.get('/Account', authMiddleware.isAuthenticated, account.getAccountsByPilot);
router.get('/Automation', authMiddleware.isAuthenticated, automation.getAutomations);
router.get('/Automation/:automation_id', authMiddleware.isAuthenticated, automation.getAutomations);
router.get('/Subscriptions', authMiddleware.isAuthenticated, automation.getSubscriptions);
router.get('/Subscriptions/:subscription_id', authMiddleware.isAuthenticated, automation.getSubscriptions);

router.post('/Automation', authMiddleware.isAuthenticated, automation.addAutomations);

// router.post('/getInstaProfileDetail', authMiddleware.isAuthenticated, controller.getInstaProfileDetail);
// router.post('/getPostDetail', authMiddleware.isAuthenticated, controller.getPostDetail);

export default router;
