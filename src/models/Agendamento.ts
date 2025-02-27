export interface Agendamento {
  id?: number;
  pacienteId: number;
  profissionalId: number;
  dataHora: string;    // ou Date
  duracao: number;
  status: string;      // "PENDENTE", "CONFIRMADO", etc.
}
