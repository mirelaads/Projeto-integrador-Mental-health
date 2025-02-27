#!/bin/bash

API_URL="http://localhost:3000"
# Substitua abaixo pelo token obtido no test_auth.sh (LOGIN)
ACCESS_TOKEN="COLE_SEU_ACCESS_TOKEN_AQUI"

USER_ID=1   # Ajuste se necessário (ex.: se o usuário criado é ID 1)

echo "=== TESTE USERS MODULE ==="
echo

# 1. GET User
echo "-> 1) GET /users/:id"
curl -i -X GET "$API_URL/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

# 2. PUT /users/:id
echo "-> 2) UPDATE /users/:id"
curl -i -X PUT "$API_URL/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "11988887777",
    "endereco": "Rua Nova, 456"
  }'
echo

# 3. POST /users/:id/avatar
echo "-> 3) UPLOAD /users/:id/avatar"
curl -i -X POST "$API_URL/users/$USER_ID/avatar" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "avatar=@/path/to/avatar.jpg"
echo

# 4. PUT /users/:id/avatar
echo "-> 4) UPDATE /users/:id/avatar"
curl -i -X PUT "$API_URL/users/$USER_ID/avatar" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F "avatar=@/path/to/new_avatar.jpg"
echo

# 5. DELETE /users/:id/avatar
echo "-> 5) DELETE /users/:id/avatar"
curl -i -X DELETE "$API_URL/users/$USER_ID/avatar" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
echo

echo "FIM DO TESTE USERS."
