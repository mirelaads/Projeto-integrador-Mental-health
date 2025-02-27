#!/bin/bash

API_URL="http://localhost:3000"

echo "=== TESTE ESPECIALIDADES MODULE ==="
echo

# GET /especialidades (pode ser público ou protegido, conforme implementação)
echo "-> 1) LISTAR ESPECIALIDADES"
curl -i -X GET "$API_URL/especialidades"
echo

# GET /especialidades/:id (admin)
echo "-> 2) OBTER ESPECIALIDADE POR ID (ADMIN)"
ACCESS_TOKEN="SEU_TOKEN_ADMIN"
curl -i -X GET "$API_URL/especialidades/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

# GET /especialidades/nome/:nome (admin)
echo "-> 3) OBTER ESPECIALIDADE POR NOME (ADMIN)"
curl -i -X GET "$API_URL/especialidades/nome/Fisioterapeuta" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

# POST /especialidades (admin)
echo "-> 4) CRIAR ESPECIALIDADE (ADMIN)"
curl -i -X POST "$API_URL/especialidades" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Fisioterapeuta"}'
echo

# PUT /especialidades/:id (admin)
echo "-> 5) ATUALIZAR ESPECIALIDADE (ADMIN)"
curl -i -X PUT "$API_URL/especialidades/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Fisioterapeuta Atualizado"}'
echo

# DELETE /especialidades/:id (admin)
echo "-> 6) REMOVER ESPECIALIDADE (ADMIN)"
curl -i -X DELETE "$API_URL/especialidades/1" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

echo "FIM DO TESTE ESPECIALIDADES."
