import { Request, Response } from 'express';
import { db } from '../config/db';
import fs from 'fs';
import path from 'path';

export class UserController {
  static async getUser(req: Request, res: Response) {
    const userId = req.params.id;
    db.get('SELECT id, nome, sobrenome, email, telefone, endereco, avatar FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(row);
    });
  }

  static async getUserByEmail(req: Request, res: Response) {
    const userEmail = req.params.email;
    db.get('SELECT id, nome, sobrenome, email, telefone, endereco, avatar FROM users WHERE email = ?', [userEmail], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(row);
    });
  }

  static async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const { telefone, endereco } = req.body;

    db.run(
      'UPDATE users SET telefone = ?, endereco = ? WHERE id = ?',
      [telefone, endereco, userId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json({ message: 'Usuário atualizado com sucesso' });
      }
    );
  }

  static async uploadAvatar(req: Request, res: Response) {
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const avatarPath = req.file.path;

    db.run('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, userId], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: 'Avatar uploaded successfully' });
    });
  }

  static async updateAvatar(req: Request, res: Response) {
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const avatarPath = req.file.path;

    db.get('SELECT avatar FROM users WHERE id = ?', [userId], (err, row: { avatar: string }) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row && row.avatar) {
        fs.unlinkSync(path.resolve(row.avatar));
      }

      db.run('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, userId], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json({ message: 'Avatar updated successfully' });
      });
    });
  }

  static async deleteAvatar(req: Request, res: Response) {
    const userId = req.params.id;

    db.get('SELECT avatar FROM users WHERE id = ?', [userId], (err, row: { avatar: string }) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row && row.avatar) {
        fs.unlinkSync(path.resolve(row.avatar));
      }

      db.run('UPDATE users SET avatar = NULL WHERE id = ?', [userId], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json({ message: 'Avatar deleted successfully' });
      });
    });
  }
}
