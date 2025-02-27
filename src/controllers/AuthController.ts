import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      await AuthService.signup(req.body);
      return res.status(201).json({ message: 'Usuário cadastrado. Verifique seu e-mail para validar o cadastro.' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async validateSignup(req: Request, res: Response) {
    const { email, token } = req.body;
    try {
      await AuthService.validateSignup(email, token);
      return res.json({ message: 'Cadastro validado com sucesso.' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const tokens = await AuthService.login(email, senha);
      return res.json(tokens);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Token de refresh ausente' });
    }
    try {
      const newTokens = await AuthService.refresh(refreshToken);
      return res.json(newTokens);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      await AuthService.forgotPassword(email);
      return res.json({ message: 'Se o e-mail existir, um token de recuperação foi enviado.' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, token, novaSenha } = req.body;
    try {
      await AuthService.resetPassword(email, token, novaSenha);
      return res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
