import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/db';
import { User } from '../models/User';
import { EmailService } from './EmailService';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secretRefresh';

export class AuthService {
  static async signup(user: User): Promise<void> {
    // Verifica se email já existe
    const existing = await new Promise<User | null>((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [user.email], (err, row) => {
        if (err) return reject(err);
        resolve(row as User || null);
      });
    });
    if (existing) {
      throw new Error('E-mail já cadastrado');
    }

    // Hashea a senha
    const hashedPassword = await bcrypt.hash(user.senha, 10);

    // Gera token de validação (simples)
    const validationToken = Math.random().toString(36).substring(2, 12);

    // Insere usuário no DB
    await new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO users (nome, sobrenome, email, senha, telefone, endereco, isValidated, tokenValidacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.nome, user.sobrenome, user.email, hashedPassword,
          user.telefone || '', user.endereco || '',
          false,
          validationToken
        ],
        function(err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    await EmailService.sendValidationEmail(user.email, validationToken);
  }

  static async validateSignup(email: string, token: string): Promise<void> {
    // Verifica se existe o user com esse token
    const user = await new Promise<User | null>((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ? AND tokenValidacao = ?',
        [email, token],
        (err, row) => {
          if (err) return reject(err);
          resolve(row as User || null);
        }
      );
    });

    if (!user) {
      throw new Error('Token inválido ou usuário inexistente');
    }

    // Atualiza para validado
    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE users SET isValidated = ?, tokenValidacao = NULL WHERE email = ?',
        [true, email],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  static async login(email: string, senha: string) {
    // Busca user
    const user = await new Promise<User | null>((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        resolve(row as User || null);
      });
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se está validado
    if (!user.isValidated) {
      throw new Error('Usuário não validado. Verifique seu e-mail');
    }

    // Compara senha
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      throw new Error('Senha incorreta');
    }

    // Gera tokens
    const accessToken = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign({ userId: user.id, type: 'refresh' }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  }

  static async refresh(refreshToken: string) {
    try {
      const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      if (decoded.type !== 'refresh') {
        throw new Error('Token inválido');
      }

      const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '2h' });
      // Opcional: gerar um novo refresh token
      // const newRefreshToken = jwt.sign({ userId: decoded.userId, type: 'refresh' }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }

  static async forgotPassword(email: string) {
    // Verificar se existe user
    const user = await new Promise<User | null>((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return reject(err);
        resolve(row as User || null);
      });
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Gera token de reset
    const resetToken = Math.random().toString(36).substring(2, 12);

    // Salva no DB
    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE users SET resetPasswordToken = ? WHERE email = ?',
        [resetToken, email],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    await EmailService.sendPasswordResetEmail(email, resetToken);
  }

  static async resetPassword(email: string, token: string, novaSenha: string) {
    // Verifica se user existe e se token confere
    const user = await new Promise<User | null>((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ? AND resetPasswordToken = ?', [email, token], (err, row) => {
        if (err) return reject(err);
        resolve(row as User || null);
      });
    });
    if (!user) {
      throw new Error('Token inválido ou usuário inexistente');
    }

    // Atualiza senha
    const hashed = await bcrypt.hash(novaSenha, 10);

    await new Promise<void>((resolve, reject) => {
      db.run(
        'UPDATE users SET senha = ?, resetPasswordToken = NULL WHERE email = ?',
        [hashed, email],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }
}
