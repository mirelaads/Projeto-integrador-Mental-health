import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import { authMiddleware } from '../utils/authMiddleware';

const router = Router();

router.post('/', authMiddleware, AgendamentoController.criar);
router.get('/historico', authMiddleware, AgendamentoController.historico);
router.put('/:id', authMiddleware, AgendamentoController.atualizar);
router.delete('/:id', authMiddleware, AgendamentoController.cancelar);

export default router;
