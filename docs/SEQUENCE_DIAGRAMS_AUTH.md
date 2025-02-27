# Diagramas de Sequência dos Módulos AUTH da API

## Fluxo de Signup

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant Database
    participant EmailService

    Client->>AuthController: POST /auth/signup
    AuthController->>AuthService: signup(user)
    AuthService->>Database: Verifica se email já existe
    Database-->>AuthService: Retorna usuário existente ou null
    AuthService->>AuthService: Hashea a senha
    AuthService->>AuthService: Gera token de validação
    AuthService->>Database: Insere usuário no DB
    AuthService->>EmailService: sendValidationEmail(email, token)
    EmailService-->>AuthService: Email enviado
    AuthService-->>AuthController: Usuário cadastrado
    AuthController-->>Client: 201 Usuário cadastrado
```

## Fluxo de Validate Signup

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant Database

    Client->>AuthController: POST /auth/validate-signup
    AuthController->>AuthService: validateSignup(email, token)
    AuthService->>Database: Verifica se existe o user com esse token
    Database-->>AuthService: Retorna usuário ou null
    AuthService->>Database: Atualiza para validado
    AuthService-->>AuthController: Cadastro validado
    AuthController-->>Client: 200 Cadastro validado
```

## Fluxo de Login

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant Database

    Client->>AuthController: POST /auth/login
    AuthController->>AuthService: login(email, senha)
    AuthService->>Database: Busca user
    Database-->>AuthService: Retorna usuário ou null
    AuthService->>AuthService: Verifica se está validado
    AuthService->>AuthService: Compara senha
    AuthService->>AuthService: Gera tokens
    AuthService-->>AuthController: Retorna tokens
    AuthController-->>Client: 200 Retorna tokens
```

## Fluxo de Refresh Token

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService

    Client->>AuthController: POST /auth/refresh
    AuthController->>AuthService: refresh(refreshToken)
    AuthService->>AuthService: Verifica e decodifica refreshToken
    AuthService->>AuthService: Gera novo accessToken
    AuthService-->>AuthController: Retorna novo accessToken
    AuthController-->>Client: 200 Retorna novo accessToken
```

## Fluxo de Forgot Password

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant Database
    participant EmailService

    Client->>AuthController: POST /auth/forgot-password
    AuthController->>AuthService: forgotPassword(email)
    AuthService->>Database: Verifica se existe user
    Database-->>AuthService: Retorna usuário ou null
    AuthService->>AuthService: Gera token de reset
    AuthService->>Database: Salva token no DB
    AuthService->>EmailService: sendPasswordResetEmail(email, token)
    EmailService-->>AuthService: Email enviado
    AuthService-->>AuthController: Token de recuperação enviado
    AuthController-->>Client: 200 Token de recuperação enviado
```

## Fluxo de Reset Password

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant Database

    Client->>AuthController: POST /auth/reset-password
    AuthController->>AuthService: resetPassword(email, token, novaSenha)
    AuthService->>Database: Verifica se user existe e se token confere
    Database-->>AuthService: Retorna usuário ou null
    AuthService->>AuthService: Hashea nova senha
    AuthService->>Database: Atualiza senha no DB
    AuthService-->>AuthController: Senha redefinida
    AuthController-->>Client: 200 Senha redefinida
