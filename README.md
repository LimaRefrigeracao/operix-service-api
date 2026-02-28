# Operix Service API 🚀

**Operix Service API** é o motor por trás do sistema Operix, uma plataforma de gestão inteligente para serviços técnicos e manutenções. Esta API robusta foi construída com foco em escalabilidade, isolamento de dados (**Multi-tenancy**) e padrões de projeto modernos.

---

## 🛠️ Tecnologias e Ferramentas

- **Runtime**: [Bun](https://bun.sh/) (Extremamente rápido e moderno)
- **Framework**: [Express.js](https://expressjs.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (via `pg`)
- **Validação**: [Zod](https://zod.dev/) (Integração total com schemas)
- **Documentação**: [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Segurança**: [JWT](https://jwt.io/) (JSON Web Tokens) e [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Real-time**: [Socket.io](https://socket.io/) (Para atualizações instantâneas de ordens de serviço)

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura baseada em classes com separação clara de responsabilidades:

- **Models**: Definem a estrutura dos dados e os Schemas de validação (Zod).
- **Repositories**: Contêm toda a lógica de persistência e consultas SQL puras (foco em performance).
- **Services**: Implementam as regras de negócio e orquestram a comunicação entre repositories.
- **Controllers**: Gerenciam as requisições HTTP e as respostas padronizadas.
- **Middlewares**: Processam lógica transversal como autenticação e validação de input.

---

## ✨ Principais Características

### 1. Multi-Tenancy Nativo
Todos os dados são isolados por unidade corporativa através do campo `tenant_id`. Um usuário de uma unidade jamais terá acesso aos dados de outra, garantindo segurança e privacidade em escala.

### 2. Validação e Tipagem Forte
Utilizamos **Zod** para garantir que cada entrada de dado na API esteja correta. Os schemas são compartilhados com o gerador de documentação, mantendo o código e o Swagger sempre sincronizados.

### 3. Respostas Padronizadas
Todas as respostas seguem um contrato único através do `ResponseHandler`:
```json
{
  "success": true,
  "msg": "Mensagem de sucesso ou erro",
  "data": { ... }
}
```

### 4. Documentação Automática
A API possui uma interface Swagger completa disponível na rota raiz `/`. Basta navegar até lá para testar todos os endpoints.

---

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) ou [Bun](https://bun.sh/) instalado.
- [Docker](https://www.docker.com/) instalado.

### Configuração
1. Clone o repositório.
2. Crie um arquivo `.env` na raiz com as variáveis do arquivo `.env.example`:

3. Configure o banco de dados e as dependências:
```bash
npm install -g bun  ##### Se o que estiver instalado for o node.js
```
```bash
bun install
```

4. Suba o ambiente (Docker):
```bash
bun run database
```

5. Execute as Migrações e Seeds (Sequelize):
```bash

bun run migrate && bun run seed
```

6. Execute em modo de desenvolvimento:
```bash
bun run dev
```

---

## 🛠️ Comandos Básicos

| Comando | Descrição |
|---------|-----------|
| `bun run database` | Sobe o banco de dados via Docker Compose |
| `bun run migrate` | Executa as migrações do banco de dados (Sequelize) |
| `bun run seed` | Deleta e popula o banco de dados com dados iniciais |
| `bun run dev` | Inicia o servidor em modo de desenvolvimento |
| `bun run start` | Inicia o servidor em modo produção |

---

## 🤝 Contato

Desenvolvido por **João Pedro P. Lima**  
📧 [joaopedrodevx.contato@gmail.com](mailto:joaopedrodevx.contato@gmail.com)  

---
*Este projeto é parte da suíte Operix para gestão eficiente de serviços.*
