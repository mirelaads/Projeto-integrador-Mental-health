#!/bin/bash

API_URL="http://localhost:3000"
# Substitua com token de um usuário válido
ACCESS_TOKEN="COLE_SEU_ACCESS_TOKEN_AQUI"

echo "=== TESTE AGENDAMENTOS MODULE ==="
echo

# 1) CRIAR AGENDAMENTO
# Precisamos de dados reais: pacienteId, profissionalId etc.
echo "-> 1) CRIAR AGENDAMENTO"
curl -i -X POST "$API_URL/agendamentos" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pacienteId": 1,
    "profissionalId": 1,
    "dataHora": "2025-03-15T09:00:00",
    "duracao": 40
  }'
echo

# 2) LISTAR HISTÓRICO
echo "-> 2) HISTORICO"
curl -i -X GET "$API_URL/agendamentos/historico?pacienteId=1&limite=5" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

# 3) ATUALIZAR AGENDAMENTO
echo "-> 3) ATUALIZAR AGENDAMENTO"
curl -i -X PUT "$API_URL/agendamentos/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pacienteId": 1,
    "profissionalId": 1,
    "dataHora": "2025-03-15T10:00:00",
    "duracao": 45,
    "status": "CONFIRMADO"
  }'
echo

# 4) CANCELAR AGENDAMENTO
echo "-> 4) CANCELAR AGENDAMENTO"
curl -i -X DELETE "$API_URL/agendamentos/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

echo "FIM DO TESTE AGENDAMENTOS."
