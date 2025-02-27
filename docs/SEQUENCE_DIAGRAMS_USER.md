# Diagramas de Sequência dos Módulos USER da API

## Fluxo de Obter Usuário

```mermaid
sequenceDiagram
    participant Client
    participant UserController
    participant Database

    Client->>UserController: GET /users/:id
    UserController->>Database: SELECT * FROM users WHERE id = ?
    Database-->>UserController: Retorna usuário ou null
    UserController-->>Client: 200 Retorna usuário ou 404 Usuário não encontrado
```

## Fluxo de Atualizar Usuário

```mermaid
sequenceDiagram
    participant Client
    participant UserController
    participant Database

    Client->>UserController: PUT /users/:id
    UserController->>Database: UPDATE users SET telefone = ?, endereco = ? WHERE id = ?
    Database-->>UserController: Usuário atualizado
    UserController-->>Client: 200 Usuário atualizado com sucesso
```

## Fluxo de Upload de Avatar

```mermaid
sequenceDiagram
    participant Client
    participant UserController
    participant Database

    Client->>UserController: POST /users/:id/avatar
    UserController->>Database: UPDATE users SET avatar = ? WHERE id = ?
    Database-->>UserController: Avatar atualizado
    UserController-->>Client: 200 Avatar uploaded successfully
```

## Fluxo de Atualizar Avatar

```mermaid
sequenceDiagram
    participant Client
    participant UserController
    participant Database
    participant FileSystem

    Client->>UserController: PUT /users/:id/avatar
    UserController->>Database: SELECT avatar FROM users WHERE id = ?
    Database-->>UserController: Retorna caminho do avatar antigo
    UserController->>FileSystem: Remove avatar antigo
    UserController->>Database: UPDATE users SET avatar = ? WHERE id = ?
    Database-->>UserController: Avatar atualizado
    UserController-->>Client: 200 Avatar updated successfully
```

## Fluxo de Deletar Avatar

```mermaid
sequenceDiagram
    participant Client
    participant UserController
    participant Database
    participant FileSystem

    Client->>UserController: DELETE /users/:id/avatar
    UserController->>Database: SELECT avatar FROM users WHERE id = ?
    Database-->>UserController: Retorna caminho do avatar
    UserController->>FileSystem: Remove avatar
    UserController->>Database: UPDATE users SET avatar = NULL WHERE id = ?
    Database-->>UserController: Avatar deletado
    UserController-->>Client: 200 Avatar deleted successfully
```
