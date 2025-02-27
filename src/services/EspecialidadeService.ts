import { db } from '../config/db';
import { Especialidade } from '../models/Especialidade';

export class EspecialidadeService {
  static async listar(): Promise<Especialidade[]> {
    const rows = await new Promise<Especialidade[]>((resolve, reject) => {
      db.all('SELECT * FROM especialidades', [], (err: Error | null, result: any) => {
        if (err) return reject(err);
        resolve((result as Especialidade[]) || []);
      });
    });
    return rows;
  }

  static async obterPorId(id: any): Promise<Especialidade | null> {
    const row = await new Promise<Especialidade | null>((resolve, reject) => {
      db.get('SELECT * FROM especialidades WHERE id = ?', [id],  (err: Error | null, result: any) =>  {
        if (err) return reject(err);
        resolve(result as Especialidade || null);
      });
    });
    return row;
  }

  static async obterPorNome(nome: string): Promise<Especialidade | null> {
    const row = await new Promise<Especialidade | null>((resolve, reject) => {
      db.get('SELECT * FROM especialidades WHERE nome = ?', [nome],  (err: Error | null, result: any) =>  {
        if (err) return reject(err);
        resolve(result as Especialidade || null);
      });
    });
    return row;
  }

  static async criar(data: Especialidade): Promise<Especialidade> {
    const { nome } = data;
    const result = await new Promise<Especialidade>((resolve, reject) => {
      db.run('INSERT INTO especialidades (nome) VALUES (?)', [nome], function (this: any, err: Error | null) {
        if (err) return reject(err);
        resolve({ id: this.lastID, nome });
      });
    });
    return result;
  }

  static async atualizar(id: any, data: Especialidade): Promise<Especialidade> {
    const { nome } = data;
    const result = await new Promise<Especialidade>((resolve, reject) => {
      db.run('UPDATE especialidades SET nome = ? WHERE id = ?', [nome, id], function (err: Error | null) {
        if (err) return reject(err);
        resolve({ id, nome });
      });
    });
    return result;
  }

  static async remover(id: any): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      db.run('DELETE FROM especialidades WHERE id = ?', [id], (err: Error | null) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
