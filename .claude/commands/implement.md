# /implement — Pipeline de Implementação com IA

Orquestra os três sub-agents em sequência para implementar uma feature do portfólio com qualidade controlada.

Uso: /implement <descrição da feature>

## Exemplos:

/implement CRUD de certificados com campos: título, instituição, data e URL da imagem
/implement componente ProjectCard que recebe project como prop e exibe título, descrição curta e tecnologias
/implement endpoint GET /api/tags e POST /api/tags com autenticação

---

# O que este comando faz

Coleta a spec da feature descrita pelo usuário.
Invoca o Code Writer para implementar o código.
Invoca o Code Reviewer para revisar e corrigir o código produzido.
Invoca o Commit Writer para sugerir a mensagem de commit.
Apresenta o resultado consolidado ao usuário.

---

# Instruções para o Orquestrador

Quando este comando for invocado, execute as etapas abaixo na ordem exata. Não pule etapas.

## Etapa 0 — Coletar a spec

A spec da feature é o argumento passado após /implement. Se o usuário não passou uma descrição suficientemente clara (menos de 10 palavras ou ambígua), peça esclarecimentos antes de prosseguir. Perguntas úteis:

É um recurso de backend (model + controller + routes), frontend (componente, página, hook) ou fullstack?
Quais campos o model deve ter? Quais são obrigatórios?
Quais rotas devem ser públicas e quais protegidas por autenticação?
O recurso se relaciona com algum model existente?

## Etapa 1 — Code Writer

Invoque o agente code-writer com o seguinte contexto:

Spec da feature: [spec do usuário]

Arquivos de referência disponíveis no projeto:

- backend/src/controllers/projectController.js (padrão de controller)
- backend/src/models/Project.js (padrão de model)
- backend/src/routes/projectRoutes.js (padrão de routes)
- backend/src/server.js (registro de rotas)

Implemente a feature seguindo rigorosamente os padrões observados nesses arquivos.
Entregue o relatório de implementação ao final.

Aguarde o relatório completo do Code Writer antes de prosseguir.

## Etapa 2 — Code Reviewer

Invoque o agente code-reviewer com o seguinte contexto:

O Code Writer acabou de implementar a seguinte feature:
[spec da feature]

Relatório do Code Writer:
[relatório recebido na Etapa 1]

Revise os arquivos listados no relatório. Aplique correções onde necessário.
Entregue o relatório de revisão ao final.

Aguarde o relatório completo do Code Reviewer antes de prosseguir.

## Etapa 3 — Commit Writer

Invoque o agente commit-writer com o seguinte contexto:

O pipeline de implementação foi concluído. Seguem os relatórios:

Relatório do Code Writer:
[relatório da Etapa 1]

Relatório do Code Reviewer:
[relatório da Etapa 2]

Analise as mudanças e sugira a mensagem de commit seguindo Conventional Commits.

## Etapa 4 — Apresentar resultado ao usuário

Consolide os resultados das três etapas e apresente ao usuário no seguinte formato:

## ✅ Pipeline concluída — [nome da feature]

### Arquivos entregues

[lista do relatório do Code Writer]

### Revisão aplicada

[lista de correções do Code Reviewer, ou "Nenhuma correção necessária"]

### Sugestão de commit

\`\`\`
[mensagem sugerida pelo Commit Writer]
\`\`\`

---s
Para commitar, execute:
\`\`\`bash
git add .
git commit -m "[mensagem]"
\`\`\`

---

# Comportamento em caso de erro

Se o Code Writer não conseguir implementar alguma parte da spec por falta de informação, pare e pergunte ao usuário o que está faltando antes de prosseguir para a revisão.
Se o Code Reviewer identificar uma violação que exige refatoração significativa (criação de novos arquivos não previstos), informe o usuário e pergunte se deseja prosseguir com a correção ou apenas registrá-la como sugestão.
Nunca execute git commit automaticamente — a confirmação é sempre manual.
