# /refactor — Pipeline de Refatoração com IA

Orquestra os três sub-agents em sequência para auditar e melhorar código existente sem alterar comportamento observável.

Uso: /refactor <escopo>

## Exemplos:

/refactor src/pages/Skills.jsx
/refactor src/components/admin/ — revisar todos os componentes de admin
/refactor backend/src/controllers/ — auditar todos os controllers
/refactor projeto inteiro — revisão geral de frontend e backend

---

# O que este comando faz

Define o escopo da refatoração com o usuário.
Invoca o Code Writer em modo de auditoria para melhorar o código existente.
Invoca o Code Reviewer para garantir que nenhum comportamento foi alterado.
Invoca o Commit Writer para sugerir a mensagem de commit com tipo `refactor`.
Apresenta o resultado consolidado ao usuário.

---

# Instruções para o Orquestrador

Quando este comando for invocado, execute as etapas abaixo na ordem exata. Não pule etapas.

## Etapa 0 — Definir o escopo

O escopo é o argumento passado após /refactor. Se o escopo for amplo demais (ex: "projeto inteiro") ou ambíguo, pergunte ao usuário:

- Qual camada deseja refatorar? (frontend, backend ou ambos)
- Há algum problema específico que motivou a refatoração? (duplicação, componente grande demais, etc.)
- Existe algum arquivo que deve ser ignorado nesta rodada?

Se o escopo for claro e delimitado (um arquivo ou um diretório específico), prossiga sem perguntar.

## Etapa 1 — Code Writer (modo auditoria)

Invoque o agente code-writer com o seguinte contexto:

Você está em modo de auditoria e refatoração — não de implementação de feature nem de correção de bug.

Escopo da refatoração: [escopo definido pelo usuário]

Siga este fluxo rigorosamente:

1. Leia CLAUDE.md (raiz) e backend/CLAUDE.md (se o escopo incluir backend) para entender os princípios do projeto.
2. Leia todos os arquivos dentro do escopo definido — não presuma o conteúdo.
3. Identifique oportunidades de melhoria nos seguintes critérios, nesta ordem de prioridade:
   a. Duplicação real de lógica de negócio (DRY) — mesma query, mesma validação, mesmo cálculo em mais de um lugar
   b. Componente ou função com mais de uma responsabilidade clara (SOLID-S)
   c. Complexidade desnecessária — lógica que pode ser simplificada sem perder clareza (KISS)
   d. Inconsistências com os padrões do projeto — nomeação, estrutura de imports, convenções de estilo
4. Aplique apenas as melhorias que não alterem o comportamento externo do código. Não adicione features. Não corrija bugs que não sejam efeito direto da refatoração.
5. Não crie novos arquivos a menos que a extração de lógica duplicada exija uma função utilitária ou hook compartilhado — e apenas se isso reduzir complexidade real.
6. Não instale dependências novas.
7. Entregue o relatório de refatoração ao final.

### Formato do relatório esperado:

#### Arquivos analisados

- `caminho/do/arquivo.jsx`

#### Arquivos modificados

- `caminho/do/arquivo.jsx`

#### Melhorias aplicadas

- **[DRY]** `arquivo.jsx`: [descrição do que foi consolidado]
- **[SOLID-S]** `arquivo.jsx`: [descrição da responsabilidade extraída]
- **[KISS]** `arquivo.jsx`: [descrição da simplificação]
- **[Consistência]** `arquivo.jsx`: [descrição da correção de padrão]

#### Oportunidades não aplicadas

- `arquivo.jsx`: [descrição da melhoria identificada e motivo por não ter sido aplicada]

#### Resumo

[2-3 frases descrevendo o que foi refatorado e o impacto esperado]

Aguarde o relatório completo do Code Writer antes de prosseguir.

## Etapa 2 — Code Reviewer (foco em não-regressão)

Invoque o agente code-reviewer com o seguinte contexto:

O Code Writer acabou de realizar uma refatoração no seguinte escopo:
[escopo definido]

Relatório do Code Writer:
[relatório recebido na Etapa 1]

Esta é uma revisão de refatoração — o foco é diferente de uma revisão de feature nova. Siga estes critérios nesta ordem:

1. Não-regressão: o comportamento externo dos arquivos modificados foi preservado? Props, contratos de API, retornos de função e fluxos de dados devem estar intactos.
2. As melhorias aplicadas realmente reduzem complexidade, ou adicionaram abstrações desnecessárias?
3. O código refatorado está consistente com os padrões do projeto (CLAUDE.md)?
4. Alguma melhoria listada em "oportunidades não aplicadas" deveria ter sido aplicada?

Aplique correções onde necessário e entregue o relatório de revisão.

Aguarde o relatório completo do Code Reviewer antes de prosseguir.

## Etapa 3 — Commit Writer

Invoque o agente commit-writer com o seguinte contexto:

O pipeline de refatoração foi concluído. O tipo do commit é `refactor`. Seguem os relatórios:

Relatório do Code Writer:
[relatório da Etapa 1]

Relatório do Code Reviewer:
[relatório da Etapa 2]

Analise as mudanças e sugira a mensagem de commit seguindo Conventional Commits com tipo `refactor`.

## Etapa 4 — Apresentar resultado ao usuário

Consolide os resultados das três etapas e apresente ao usuário no seguinte formato:

## ♻️ Pipeline de refatoração concluída — [escopo]

### Arquivos analisados

[lista do Code Writer]

### Melhorias aplicadas

[lista de melhorias do Code Writer, ou "Nenhuma melhoria necessária"]

### Revisão de não-regressão

[resultado do Code Reviewer, ou "Comportamento externo preservado — nenhuma correção necessária"]

### Oportunidades registradas para o futuro

[lista de oportunidades não aplicadas do Code Writer, se houver]

### Sugestão de commit

```
[mensagem sugerida pelo Commit Writer]
```

---

Para commitar, execute:

```bash
git add .
git commit -m "[mensagem]"
```

---

# Comportamento em caso de erro

Se o Code Writer identificar uma oportunidade de melhoria que exige criar novos arquivos (ex: extrair hook compartilhado), informe o usuário e confirme antes de prosseguir — a criação de novos arquivos em uma refatoração é exceção, não regra.
Se o Code Reviewer identificar regressão de comportamento, reverta a alteração problemática e registre no relatório final o que foi desfeito e por quê.
Nunca execute git commit automaticamente — a confirmação é sempre manual.
