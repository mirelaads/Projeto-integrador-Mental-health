<h1 align="center"> Ψ Mental Health Ψ </h1>

Sobre o projeto

O Mental Health é um aplicativo mobile inovador desenvolvido como parte do projeto integrador do Senac, com o objetivo de facilitar o acesso a serviços de saúde mental e promover o bem-estar da população.
<br/>
<h2>🔘 Objetivo do projeto</h2>

Este projeto visa criar um aplicativo intuitivo e acessível que conecte usuários a profissionais de saúde mental, como psicólogos e psiquiatras. O aplicativo oferece funcionalidades como agendamento de consultas, busca por profissionais e gerenciamento de perfil, tudo em uma interface amigável e fácil de usar.


<h2>Nossas Funcionalidades:</h2>

* Agendamento simplificado: Agende consultas com profissionais de saúde mental de forma rápida e fácil.
* Busca por profissionais: Encontre profissionais com base em especialidade, localização e outros critérios.
* Perfil do usuário: Gerencie seus dados, histórico de consultas e informações relevantes.
* Autenticação segura: Cadastro, login e recuperação de senha com validação por e-mail e tokens JWT.
* Gerenciamento de profissionais e especialidades: Ferramentas para administradores gerenciarem a plataforma.


Tecnologias Utilizadas:

Frontend:
* React Native
* Expo
* TypeScript
* Componentes UI (Button, TextInput, etc.)

Backend:
* Node.js
* TypeScript
* SQLite
* JWT


<h2>🎨 Layout</h2>

O layout do aplicativo foi desenvolvido no Figma:
[Acessar Layout Figma](https://www.figma.com/design/3J9Rl4RfeByaWwRGKadKTZ/Mental-Health?node-id=0-1&t=uGS3lHJyGkV0H01d-1)
<br/>
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
<br/>

<h2>👥 Colaboradores</h2>

<div style="display: flex; flex-wrap: wrap; justify-content: center;">
  <div style="text-align: center; margin: 10px;">
    <img src="https://avatars.githubusercontent.com/u/142458518?v=4" alt="Mirela Souza" style="width: 100px; height: 100px; border-radius: 50%;">
    <br>
    <a href="https://github.com/mirelaads">Mirela Souza</a>
  </div>
  <div style="text-align: center; margin: 10px;">
    <img src="https://avatars.githubusercontent.com/u/163220040?v=4" alt="Leo Baganha" style="width: 100px; height: 100px; border-radius: 50%;">
    <br>
    <a href="https://github.com/leobaganha">Leo Baganha</a>
  </div>
  <div style="text-align: center; margin: 10px;">
    <img src="https://avatars.githubusercontent.com/u/86894587?v=4" alt="Marcus Vinicius" style="width: 100px; height: 100px; border-radius: 50%;">
    <br>
    <a href="https://github.com/dkexs">Marcus Vinicius</a>
  </div>
  <div style="text-align: center; margin: 10px;">
    <img src="https://avatars.githubusercontent.com/u/68756099?v=4" alt="Daniel Ferreira" style="width: 100px; height: 100px; border-radius: 50%;">
    <br>
    <a href="https://github.com/DanielFerreiraNeves">Daniel Ferreira</a>
  </div>
  <div style="text-align: center; margin: 10px;">
    <img src="https://avatars.githubusercontent.com/u/115818890?v=4" alt="Thiago Duarte" style="width: 100px; height: 100px; border-radius: 50%;">
    <br>
    <a href="https://github.com/ThiagoDuarteDEV">Thiago Duarte</a>
  </div>
</div>
<br/>
👥 **Participação dos Colaboradores**

| Colaborador                                                 | Função                                            |
| ----------------------------------------------------------- | ------------------------------------------------- |
| [mirelaads](https://github.com/mirelaads)                   | Responsável Backend                               |
| [dkexs](https://github.com/dkexs)                           | Responsável Frontend                              |
| [LeoBaganha](https://github.com/leobaganha)                 | Responsável Backend                               |
| [Danielferreira](https://github.com/DanielFerreiraNeves)    | Template Figma e Revisão da primeira parte        |
| [Thiagoduarte](https://github.com/ThiagoDuarteDEV)          | Template figma e vídeo                            |
