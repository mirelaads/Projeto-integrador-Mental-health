import { Request, Response } from 'express';
import { ProfissionalService } from '../services/ProfissionalService';

export class ProfissionalController {
  static async listar(req: Request, res: Response) {
    const { especialidadeId } = req.query;
    try {
      const profissionais = await ProfissionalService.listar(
        especialidadeId ? Number(especialidadeId) : undefined
      );
      return res.json(profissionais);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const profissional = await ProfissionalService.criar(req.body);
      return res.status(201).json(profissional);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizarPorId(req: Request, res: Response) {
    const profissionalId = req.params.id;
    try {
      const profissional = await ProfissionalService.atualizarPorId(profissionalId, req.body);
      return res.json(profissional);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizarPorEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const profissional = await ProfissionalService.atualizarPorEmail(email, req.body);
      return res.json(profissional);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async obterPorId(req: Request, res: Response) {
    const profissionalId = req.params.id;
    try {
      const profissional = await ProfissionalService.obterPorId(profissionalId);
      return res.json(profissional);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async obterPorEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const profissional = await ProfissionalService.obterPorEmail(email);
      return res.json(profissional);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
