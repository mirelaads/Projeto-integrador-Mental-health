import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import agendamentoRoutes from './routes/agendamento.routes';
import especialidadeRoutes from './routes/especialidade.routes';
import profissionalRoutes from './routes/profissional.routes';
import { db } from './config/db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load tabelas no SQLite
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    sobrenome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    telefone TEXT,
    endereco TEXT,
    isValidated BOOLEAN,
    tokenValidacao TEXT,
    resetPasswordToken TEXT,
    avatar TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS especialidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS profissionais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    especialidadeId INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pacienteId INTEGER,
    profissionalId INTEGER,
    dataHora TEXT,
    duracao INTEGER,
    status TEXT
  )`);
});

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/especialidades', especialidadeRoutes);
app.use('/profissionais', profissionalRoutes);

export default app;
