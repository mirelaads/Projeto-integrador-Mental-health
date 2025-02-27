import { db } from '../config/db';
import { Profissional } from '../models/Profissional';

export class ProfissionalService {
  static async listar(especialidadeId?: number): Promise<Profissional[]> {
    if (especialidadeId) {
      const rows = await new Promise<Profissional[]>((resolve, reject) => {
        db.all(
          'SELECT * FROM profissionais WHERE especialidadeId = ?',
          [especialidadeId],
          (err, result) => {
            if (err) return reject(err);
            resolve((result as Profissional[]) || []);
          }
        );
      });
      return rows;
    } else {
      const rows = await new Promise<Profissional[]>((resolve, reject) => {
        db.all('SELECT * FROM profissionais', [], (err, result) => {
          if (err) return reject(err);
          resolve((result as Profissional[]) || []);
        });
      });
      return rows;
    }
  }

  static async criar(data: Partial<Profissional>): Promise<Profissional> {
    const { nome, especialidadeId, email } = data;
    const result = await new Promise<Profissional>((resolve, reject) => {
      db.run(
        'INSERT INTO profissionais (nome, especialidadeId, email) VALUES (?, ?, ?)',
        [nome, especialidadeId, email],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, nome, especialidadeId, email } as Profissional);
        }
      );
    });
    return result;
  }

  static async atualizarPorId(id: any, data: Partial<Profissional>): Promise<Profissional> {
    const { nome, especialidadeId, email } = data;
    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE profissionais SET nome = ?, especialidadeId = ?, email = ? WHERE id = ?',
        [nome, especialidadeId, email, id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    return { id, nome, especialidadeId, email } as Profissional;
  }

  static async atualizarPorEmail(email: string, data: Partial<Profissional>): Promise<Profissional> {
    const { nome, especialidadeId } = data;
    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE profissionais SET nome = ?, especialidadeId = ? WHERE email = ?',
        [nome, especialidadeId, email],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
    return { nome, especialidadeId, email } as Profissional;
  }

  static async obterPorId(id: any): Promise<Profissional> {
    const result = await new Promise<Profissional>((resolve, reject) => {
      db.get('SELECT * FROM profissionais WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row as Profissional);
      });
    });
    return result;
  }

  static async obterPorEmail(email: string): Promise<Profissional> {
    const result = await new Promise<Profissional>((resolve, reject) => {
      db.get('SELECT * FROM profissionais WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        resolve(row as Profissional);
      });
    });
    return result;
  }
}
