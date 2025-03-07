# PI saúde-metal Backend

## Descrição
Este é o backend do projeto Mental Health, desenvolvido em Node.js com TypeScript. Ele fornece APIs para gerenciar usuários, profissionais, especialidades e agendamentos.

## Pré-requisitos
- Node.js (versão 14 ou superior)
- npm
- SQLite

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/mental_health.git
    cd mental_health/mental-health-backend-node-ts
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```env
    PORT=3000
    JWT_SECRET=***
    JWT_REFRESH_SECRET=***
    MAILERSEND_URL=https://api.mailersend.com/v1/
    EMAIL_USER=no-reply@******.mlsender.net
    API_KEY=mlsn.**********
    ```

## Executando o Projeto

1. Inicie o servidor:
    ```bash
    npm run start:dev
    ```

2. O servidor estará rodando em `http://localhost:3000`.

## Endpoints

### Autenticação
- `POST /auth/signup`: Cadastro de novo usuário
- `POST /auth/validate-signup`: Validação de cadastro
- `POST /auth/login`: Login de usuário
- `POST /auth/refresh`: Refresh token
- `POST /auth/forgot-password`: Solicitação de redefinição de senha
- `POST /auth/reset-password`: Redefinição de senha

### Usuários
- `GET /users/:id`: Obter usuário por ID
- `PUT /users/:id`: Atualizar usuário por ID
- `GET /users/email/:email`: Obter usuário por email
- `POST /users/:id/avatar`: Upload de avatar
- `PUT /users/:id/avatar`: Atualizar avatar
- `DELETE /users/:id/avatar`: Deletar avatar

### Profissionais
- `GET /profissionais`: Listar profissionais
- `POST /profissionais`: Criar profissional
- `PUT /profissionais/:id`: Atualizar profissional por ID
- `PUT /profissionais/email/:email`: Atualizar profissional por email
- `GET /profissionais/:id`: Obter profissional por ID
- `GET /profissionais/email/:email`: Obter profissional por email

### Especialidades
- `GET /especialidades`: Listar especialidades
- `GET /especialidades/:id`: Obter especialidade por ID
- `GET /especialidades/nome/:nome`: Obter especialidade por nome
- `POST /especialidades`: Criar especialidade
- `PUT /especialidades/:id`: Atualizar especialidade
- `DELETE /especialidades/:id`: Remover especialidade

### Agendamentos
- `POST /agendamentos`: Criar agendamento
- `GET /agendamentos/historico`: Obter histórico de agendamentos
- `PUT /agendamentos/:id`: Atualizar agendamento
- `DELETE /agendamentos/:id`: Cancelar agendamento

## Fluxos por Módulos

### Autenticação
1. **Cadastro**: O usuário envia uma solicitação de cadastro (`POST /auth/signup`). Após o cadastro, um email de validação é enviado. O usuário valida o cadastro (`POST /auth/validate-signup`).
2. **Login**: O usuário faz login (`POST /auth/login`) e recebe um token de acesso.
3. **Recuperação de Senha**: O usuário solicita a recuperação de senha (`POST /auth/forgot-password`). Um email com um token de redefinição é enviado. O usuário redefine a senha (`POST /auth/reset-password`).

### Usuários
1. **Gerenciamento de Perfil**: O usuário pode visualizar (`GET /users/:id`), atualizar (`PUT /users/:id`), e gerenciar seu avatar (`POST /users/:id/avatar`, `PUT /users/:id/avatar`, `DELETE /users/:id/avatar`).

### Profissionais
1. **Gerenciamento de Profissionais**: Administradores podem listar (`GET /profissionais`), criar (`POST /profissionais`), atualizar (`PUT /profissionais/:id`, `PUT /profissionais/email/:email`), e obter detalhes de profissionais (`GET /profissionais/:id`, `GET /profissionais/email/:email`).

### Especialidades
1. **Gerenciamento de Especialidades**: Administradores podem listar (`GET /especialidades`), criar (`POST /especialidades`), atualizar (`PUT /especialidades/:id`), e remover especialidades (`DELETE /especialidades/:id`).

### Agendamentos
1. **Gerenciamento de Agendamentos**: Usuários autenticados podem criar (`POST /agendamentos`), visualizar histórico (`GET /agendamentos/historico`), atualizar (`PUT /agendamentos/:id`), e cancelar agendamentos (`DELETE /agendamentos/:id`).

## Contribuição
Sinta-se à vontade para contribuir com o projeto. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença
Este projeto está licenciado sob a licença MIT.
