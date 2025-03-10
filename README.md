<h1 align="center">Saúde Mental</h1>

<p align="center">Sobre o projeto:</p>

O Mental Health é um aplicativo mobile inovador desenvolvido como parte do projeto integrador do Senac, com o objetivo de facilitar o acesso a serviços de saúde mental e promover o bem-estar da população.

🔘 Objetivo do projeto

Este projeto visa criar um aplicativo intuitivo e acessível que conecte usuários a profissionais de saúde mental, como psicólogos e psiquiatras. O aplicativo oferece funcionalidades como agendamento de consultas, busca por profissionais e gerenciamento de perfil, tudo em uma interface amigável e fácil de usar.

Nossas Funcionalidades:

Agendamento simplificado: Agende consultas com profissionais de saúde mental de forma rápida e fácil.
Busca por profissionais: Encontre profissionais com base em especialidade, localização e outros critérios.
Perfil do usuário: Gerencie seus dados, histórico de consultas e informações relevantes.
Autenticação segura: Cadastro, login e recuperação de senha com validação por e-mail e tokens JWT.
Gerenciamento de profissionais e especialidades: Ferramentas para administradores gerenciarem a plataforma.

Tecnologias Utilizadas:

Frontend:
React Native
Expo
TypeScript
Componentes UI (Button, TextInput, etc.)

Backend:
Node.js
TypeScript
SQLite
JWT

🎨 Layout

O layout do aplicativo foi desenvolvido no Figma:
[Acessar Layout Figma](https://www.figma.com/design/3J9Rl4RfeByaWwRGKadKTZ/Mental-Health?node-id=0-1&t=uGS3lHJyGkV0H01d-1)

<a href="[https://www.figma.com/seu-projeto](https://www.figma.com/design/3J9Rl4RfeByaWwRGKadKTZ/Mental-Health?node-id=0-1&t=uGS3lHJyGkV0H01d-1)" style="background-color: #238636; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Acessar Layout Figma</a>


## Instalação

1. Clone o repositório (BACKEND):
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

Contribuição
Sinta-se à vontade para contribuir com o projeto. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença
Este projeto está licenciado sob a licença MIT.


👥 Colaboradores

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
  <div>
    <a href="https://github.com/mirelaads">Mirela Souza</a>
  </div>
  <div>
    <a href="https://github.com/leobaganha">Leo Baganha</a>
  </div>
  <div>
    <a href="https://github.com/dkexs">Marcus Vinicius</a>
  </div>
    <div>
    <a href="https://github.com/DanielFerreiraNeves">Daniel Ferreira</a>
  </div>
    <div>
    <a href="https://github.com/ThiagoDuarteDEV">Thiago Duarte</a>
  </div>
  </div>
