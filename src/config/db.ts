import { Database } from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../database/database.sqlite');

export const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco SQLite:', err);
  } else {
    console.log('Conectado ao banco SQLite em', dbPath);
  }
});
