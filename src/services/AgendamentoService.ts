import { db } from '../config/db';
import { Agendamento } from '../models/Agendamento';

export class AgendamentoService {
  static async criarAgendamento(ag: Agendamento): Promise<void> {
    // Verificar conflito
    const conflito = await new Promise<Agendamento | null>((resolve, reject) => {
      db.get(
        `SELECT * FROM agendamentos
         WHERE profissionalId = ?
         AND dataHora = ?`,
        [ag.profissionalId, ag.dataHora],
        (err, row) => {
          if (err) return reject(err);
          resolve(row as Agendamento || null);
        }
      );
    });

    if (conflito) {
      throw new Error('Já existe agendamento neste horário para este profissional.');
    }

    // Inserir no DB
    await new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO agendamentos (pacienteId, profissionalId, dataHora, duracao, status)
         VALUES (?, ?, ?, ?, ?)`,
        [ag.pacienteId, ag.profissionalId, ag.dataHora, ag.duracao, 'PENDENTE'],
        function(err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static async listarHistorico(pacienteId: number, limite: number): Promise<Agendamento[]> {
    const rows = await new Promise<Agendamento[]>((resolve, reject) => {
      db.all(
        `SELECT * FROM agendamentos
         WHERE pacienteId = ?
         ORDER BY dataHora DESC
         LIMIT ?`,
        [pacienteId, limite],
        (err, result) => {
          if (err) return reject(err);
          resolve((result as Agendamento[]) || []);
        }
      );
    });
    return rows;
  }

  static async atualizarAgendamento(id: number, ag: Partial<Agendamento>): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      db.run(
        `UPDATE agendamentos
         SET pacienteId = ?, profissionalId = ?, dataHora = ?, duracao = ?, status = ?
         WHERE id = ?`,
        [ag.pacienteId, ag.profissionalId, ag.dataHora, ag.duracao, ag.status, id],
        function(err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static async cancelarAgendamento(id: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      db.run(
        `DELETE FROM agendamentos WHERE id = ?`,
        [id],
        function(err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }
}
