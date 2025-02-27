import { Router } from 'express';
import { ProfissionalController } from '../controllers/ProfissionalController';
import { authMiddleware } from '../utils/authMiddleware';

const router = Router();

router.get('/', authMiddleware, ProfissionalController.listar);
router.post('/', authMiddleware, ProfissionalController.criar);
router.put('/:id', authMiddleware, ProfissionalController.atualizarPorId);
router.put('/email/:email', authMiddleware, ProfissionalController.atualizarPorEmail);
router.get('/:id', authMiddleware, ProfissionalController.obterPorId);
router.get('/email/:email', authMiddleware, ProfissionalController.obterPorEmail);

export default router;
