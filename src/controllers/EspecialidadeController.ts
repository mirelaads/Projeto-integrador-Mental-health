import { Request, Response } from 'express';
import { EspecialidadeService } from '../services/EspecialidadeService';

export class EspecialidadeController {
  static async listar(req: Request, res: Response) {
    try {
      const especialidades = await EspecialidadeService.listar();
      return res.json(especialidades);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async obterPorId(req: Request, res: Response) {
    try {
      const especialidade = await EspecialidadeService.obterPorId(req.params.id);
      if (!especialidade) {
        return res.status(404).json({ error: 'Especialidade não encontrada' });
      }
      return res.json(especialidade);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async obterPorNome(req: Request, res: Response) {
    try {
      const especialidade = await EspecialidadeService.obterPorNome(req.params.nome);
      if (!especialidade) {
        return res.status(404).json({ error: 'Especialidade não encontrada' });
      }
      return res.json(especialidade);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const especialidade = await EspecialidadeService.criar(req.body);
      return res.status(201).json(especialidade);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const especialidade = await EspecialidadeService.atualizar(req.params.id, req.body);
      return res.json(especialidade);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async remover(req: Request, res: Response) {
    try {
      await EspecialidadeService.remover(req.params.id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
