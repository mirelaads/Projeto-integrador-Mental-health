export interface User {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;         // armazenar hash
  telefone?: string;
  endereco?: string;
  isValidated?: boolean; // controle de cadastro
  tokenValidacao?: string;
  resetPasswordToken?: string;
  avatar?: string;
}
