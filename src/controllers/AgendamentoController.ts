import { Request, Response } from 'express';
import { AgendamentoService } from '../services/AgendamentoService';

export class AgendamentoController {
  static async criar(req: Request, res: Response) {
    try {
      await AgendamentoService.criarAgendamento(req.body);
      return res.status(201).json({ message: 'Agendamento criado com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async historico(req: Request, res: Response) {
    const { pacienteId, limite } = req.query;
    try {
      const lista = await AgendamentoService.listarHistorico(Number(pacienteId), Number(limite) || 5);
      return res.json(lista);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await AgendamentoService.atualizarAgendamento(Number(id), req.body);
      return res.json({ message: 'Agendamento atualizado com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async cancelar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await AgendamentoService.cancelarAgendamento(Number(id));
      return res.json({ message: 'Agendamento cancelado com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
