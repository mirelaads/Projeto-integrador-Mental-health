import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../utils/authMiddleware';
import { uploadMiddleware } from '../utils/uploadMiddleware';

const router = Router();

router.get('/:id', authMiddleware, UserController.getUser);
router.put('/:id', authMiddleware, UserController.updateUser);
router.get('/email/:email', authMiddleware, UserController.getUserByEmail);
router.post('/:id/avatar', authMiddleware, uploadMiddleware.single('avatar'), UserController.uploadAvatar);
router.put('/:id/avatar', authMiddleware, uploadMiddleware.single('avatar'), UserController.updateAvatar);
router.delete('/:id/avatar', authMiddleware, UserController.deleteAvatar);

export default router;
