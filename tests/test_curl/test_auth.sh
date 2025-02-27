#!/bin/bash

API_URL="http://localhost:3000"

echo "=== TESTE AUTH MODULE ==="
echo

# 1. Signup
echo "-> 1) SIGNUP"
curl -i -X POST "$API_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Davi",
    "sobrenome": "Faustino",
    "email": "davidfaustinoeng@gmail.com",
    "senha": "senha123",
    "telefone": "11999999999",
    "endereco": "Rua de Teste, 100"
  }'
echo
echo "Assumindo que o usuário foi criado. Um token de validação foi enviado por e-mail (fictício)."
echo

# 2. Validate Signup (NECESSÁRIO TOKEN). Exemplo de token fictício: "abcd1234"
# Substitua "abcd1234" pelo token real que o usuário recebeu por e-mail
echo "-> 2) VALIDATE SIGNUP"
curl -i -X POST "$API_URL/auth/validate-signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "davidfaustinoeng@gmail.com",
    "token": "abcd1234"
  }'
echo

# 3. Login
echo "-> 3) LOGIN"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "fulano@example.com",
    "senha": "senha123"
  }')

echo "Login Response: $LOGIN_RESPONSE"
echo

# Extrai accessToken e refreshToken (caso queira armazenar automaticamente)
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | sed 's/.*"accessToken":"\([^"]*\)".*/\1/')
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | sed 's/.*"refreshToken":"\([^"]*\)".*/\1/')

echo "ACCESS_TOKEN=$ACCESS_TOKEN"
echo "REFRESH_TOKEN=$REFRESH_TOKEN"
echo

# 4. Refresh Token
echo "-> 4) REFRESH TOKEN"
curl -i -X POST "$API_URL/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\": \"$REFRESH_TOKEN\"}"
echo

# 5. Forgot Password
echo "-> 5) FORGOT PASSWORD"
curl -i -X POST "$API_URL/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "fulano@example.com"
  }'
echo
echo "Checar e-mail fictício para reset token."
echo

# 6. Reset Password (NECESSÁRIO TOKEN de reset)
echo "-> 6) RESET PASSWORD"
curl -i -X POST "$API_URL/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "fulano@example.com",
    "token": "RESET_TOKEN_EXEMPLO",
    "novaSenha": "novaSenhaABC"
  }'
echo

echo "FIM DO TESTE AUTH."
