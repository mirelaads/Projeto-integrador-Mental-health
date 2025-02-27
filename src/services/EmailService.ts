import * as MailSend from '../config/mail';

export class EmailService {
  static async sendValidationEmail(to: string, token: any) {
    const subject = 'Valide seu cadastro';
    const content = `Olá! Use este token para validar seu cadastro: ${token}\n\nObrigado!`;
    await MailSend.sendMail(to, subject, content);
  }

  static async sendPasswordResetEmail(to: string, resetToken: string) {
    const subject = 'Recupere sua senha';
    const content = `Você solicitou a redefinição de senha. Use este token para redefinir: ${resetToken}\n\nSe não foi você, ignore este e-mail.`;
    await MailSend.sendMail(to, subject, content);
  }

}
