#!/bin/bash

API_URL="http://localhost:3000"

echo "=== TESTE PROFISSIONAIS MODULE ==="
echo

# GET /profissionais sem filtro
echo "-> 1) LISTAR TODOS PROFISSIONAIS"
curl -i -X GET "$API_URL/profissionais"
echo

# GET /profissionais?especialidadeId=1
echo "-> 2) LISTAR PROFISSIONAIS FILTRADOS POR ESPECIALIDADE"
curl -i -X GET "$API_URL/profissionais?especialidadeId=1"
echo

# POST /profissionais
echo "-> 3) CRIAR PROFISSIONAL"
curl -i -X POST "$API_URL/profissionais" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dra. Maria Auxiliadora",
    "especialidadeId": 1,
    "email": "maria.auxiliadora@example.com"
  }'
echo

# PUT /profissionais/:id
echo "-> 4) ATUALIZAR PROFISSIONAL POR ID"
curl -i -X PUT "$API_URL/profissionais/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dra. Maria Auxiliadora Atualizada",
    "especialidadeId": 2,
    "email": "maria.auxiliadora.atualizada@example.com"
  }'
echo

# PUT /profissionais/email/:email
echo "-> 5) ATUALIZAR PROFISSIONAL POR EMAIL"
curl -i -X PUT "$API_URL/profissionais/email/maria.auxiliadora@example.com" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dra. Maria Auxiliadora Atualizada",
    "especialidadeId": 2
  }'
echo

# GET /profissionais/:id
echo "-> 6) OBTER PROFISSIONAL POR ID"
curl -i -X GET "$API_URL/profissionais/1"
echo

# GET /profissionais/email/:email
echo "-> 7) OBTER PROFISSIONAL POR EMAIL"
curl -i -X GET "$API_URL/profissionais/email/maria.auxiliadora@example.com"
echo

echo "FIM DO TESTE PROFISSIONAIS."
