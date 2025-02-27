import { Router } from 'express';
import { EspecialidadeController } from '../controllers/EspecialidadeController';
import { authMiddleware } from '../utils/authMiddleware';

const router = Router();

router.get('/', authMiddleware, EspecialidadeController.listar);
router.get('/:id', authMiddleware, EspecialidadeController.obterPorId);
router.get('/nome/:nome', authMiddleware, EspecialidadeController.obterPorNome);
router.post('/', authMiddleware, EspecialidadeController.criar);
router.put('/:id', authMiddleware, EspecialidadeController.atualizar);
router.delete('/:id', authMiddleware, EspecialidadeController.remover);

export default router;
