# Portfólio Pessoal — Contexto do Projeto

Este arquivo é carregado automaticamente em toda sessão. Ele fornece o contexto completo do projeto para todos os agents e para o orquestrador.

---

## Visão Geral

Projeto de portfólio pessoal com o objetivo de apresentar habilidades, projetos, experiências e permitir contato. A aplicação é dividida em um backend REST (API) e um frontend SPA.

O escopo é simples e intencional. Soluções devem ser proporcionais à complexidade real do problema — sem over-engineering, sem abstrações prematuras.

---

## Stack

| Camada    | Tecnologia                             |
| --------- | -------------------------------------- |
| Frontend  | React 19, TailwindCSS, Vite, shadcn/ui |
| Backend   | Node.js, Express.js 5                  |
| Banco     | MongoDB via Mongoose 9                 |
| Auth      | JWT (jsonwebtoken) + bcryptjs          |
| Qualidade | ESLint, Prettier, Husky, commitlint    |
| Validação | Zod (quando necessário)                |

---

## Arquitetura

```
portfolio/
├── backend/          → API REST (Express + MongoDB)
│   └── src/
│       ├── config/       → configuração de infraestrutura (DB)
│       ├── controllers/  → handlers das rotas, lógica de negócio
│       ├── middlewares/  → funções cross-cutting (ex: auth)
│       ├── models/       → schemas Mongoose
│       ├── routes/       → definição de endpoints por recurso
│       ├── scripts/      → utilitários de linha de comando
│       └── errors/       → tratamento centralizado de erros
│
└── src/              → SPA React
    ├── components/   → componentes reutilizáveis (ui/, layout/)
    ├── pages/        → páginas da aplicação
    ├── hooks/        → custom hooks React
    └── services/     → chamadas HTTP à API
```

---

## Princípios de Desenvolvimento

### SOLID — aplicado com bom senso

- **S (SRP):** cada arquivo tem uma única responsabilidade. Controller não valida schema, model não faz lógica de negócio.
- **O (OCP):** preferir extensão por composição, não modificação de código existente.
- **D (DIP):** controllers dependem do Model (abstração Mongoose), não de implementações diretas de banco.
- Os princípios **L** e **I** têm aplicação limitada neste escopo — não criar interfaces artificiais para cumpri-los.

### DRY — sem duplicação de lógica

- Lógica repetida entre controllers deve virar middleware ou função utilitária.
- Queries Mongoose repetidas podem virar métodos estáticos no model.
- Pequena duplicação de código estrutural (ex: try/catch) é **aceitável** — não criar abstrações só por isso.

### KISS — a solução mais simples que funciona

- Não introduzir bibliotecas sem necessidade real.
- Não criar camadas (services, repositories) que não agregam valor no escopo atual.
- Se a solução cabe em um controller, fica no controller.

---

## Convenções de Nomenclatura

| Elemento    | Convenção            | Exemplo                 |
| ----------- | -------------------- | ----------------------- |
| Arquivos JS | camelCase            | `projectController.js`  |
| Models      | PascalCase (arquivo) | `Project.js`            |
| Componentes | PascalCase           | `ProjectCard.jsx`       |
| Hooks       | camelCase com `use`  | `useProjects.js`        |
| Services    | camelCase            | `projectService.js`     |
| Variáveis   | camelCase            | `const projectData`     |
| Constantes  | UPPER_SNAKE_CASE     | `const MAX_RETRIES = 3` |

---

## Estilo de Código

- **Módulos:** ESM (`import/export`) em todo o projeto — nunca `require()`.
- **Async:** sempre `async/await`, nunca `.then()` encadeado.
- **Mensagens de erro:** em português, descritivas e no formato `{ message: "..." }`.
- **Status HTTP:** usar semântica correta — 200 GET/PATCH, 201 POST, 204 DELETE sem corpo, 400 dados inválidos, 401 não autenticado, 404 não encontrado, 500 erro interno.
- **Formatação:** gerenciada pelo Prettier — não discutir estilo de formatação, apenas seguir.

---

## O que NÃO fazer

- Não criar arquivos de service layer sem que a complexidade justifique.
- Não usar `var` — apenas `const` e `let`.
- Não usar callbacks — apenas Promises e async/await.
- Não commitar `console.log` de debug — apenas `console.error` em blocos catch.
- Não modificar `.env` ou arquivos de configuração de infraestrutura sem instrução explícita.
- Não instalar novas dependências sem perguntar ao usuário primeiro.
