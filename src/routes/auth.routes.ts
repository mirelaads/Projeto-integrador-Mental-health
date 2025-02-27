import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/validate-signup', AuthController.validateSignup);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router;
