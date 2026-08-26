# /fix — Pipeline de Correção de Bugs com IA

Orquestra os três sub-agents em sequência para diagnosticar e corrigir um bug com o mínimo de alterações necessárias.

Uso: /fix <descrição do problema>

## Exemplos:

/fix PATCH /api/projects/:id retorna 200 quando o projeto não existe
/fix componente ProjectCard não exibe as tecnologias quando o array está vazio
/fix endpoint de login retorna 500 ao invés de 401 com credenciais inválidas

---

# O que este comando faz

Coleta a descrição do bug e o contexto necessário para reproduzi-lo.
Invoca o Code Writer para diagnosticar e aplicar a correção mínima necessária.
Invoca o Code Reviewer para verificar se a correção não introduziu novos problemas.
Invoca o Commit Writer para sugerir a mensagem de commit com tipo `fix`.
Apresenta o resultado consolidado ao usuário.

---

# Instruções para o Orquestrador

Quando este comando for invocado, execute as etapas abaixo na ordem exata. Não pule etapas.

## Etapa 0 — Coletar o contexto do bug

A descrição do bug é o argumento passado após /fix. Antes de acionar o Code Writer, verifique se você tem informações suficientes para um diagnóstico preciso. Se não tiver, pergunte:

- Qual é o comportamento atual? (o que está acontecendo)
- Qual é o comportamento esperado? (o que deveria acontecer)
- Em qual arquivo ou endpoint o problema ocorre? (se souber)
- Há alguma mensagem de erro no console ou na resposta da API?

Se a descrição já responder essas perguntas, prossiga sem perguntar.

## Etapa 1 — Code Writer

Invoque o agente code-writer com o seguinte contexto:

Você está em modo de correção de bug — não de implementação de feature.

Bug reportado: [descrição do bug]

Contexto adicional: [informações coletadas na Etapa 0, se houver]

Siga este fluxo rigorosamente:

1. Leia CLAUDE.md e backend/CLAUDE.md para entender o projeto.
2. Identifique os arquivos envolvidos no bug (controller, model, route, componente, etc.).
3. Leia esses arquivos na íntegra — não presuma o conteúdo.
4. Diagnostique a causa raiz do problema.
5. Aplique a correção mínima necessária. Não reorganize código que não está relacionado ao bug. Não crie novos arquivos a menos que seja absolutamente necessário para a correção.
6. Entregue o relatório de diagnóstico e correção ao final.

### Formato do relatório esperado:

#### Diagnóstico

[Descrição objetiva da causa raiz]

#### Arquivos modificados

- `caminho/do/arquivo.js`

#### Correção aplicada

[Descrição da mudança feita e por quê ela resolve o problema]

Aguarde o relatório completo do Code Writer antes de prosseguir.

## Etapa 2 — Code Reviewer

Invoque o agente code-reviewer com o seguinte contexto:

O Code Writer acabou de corrigir o seguinte bug:
[descrição do bug]

Relatório do Code Writer:
[relatório recebido na Etapa 1]

Revise os arquivos modificados. Nesta revisão, o foco principal é:

1. A correção realmente resolve o bug descrito?
2. A correção introduziu alguma regressão nos fluxos existentes?
3. Os padrões do projeto foram mantidos (ESM, try/catch, mensagens em português, etc.)?

Aplique correções onde necessário e entregue o relatório de revisão.

Aguarde o relatório completo do Code Reviewer antes de prosseguir.

## Etapa 3 — Commit Writer

Invoque o agente commit-writer com o seguinte contexto:

O pipeline de correção de bug foi concluído. O tipo do commit é `fix`. Seguem os relatórios:

Relatório do Code Writer:
[relatório da Etapa 1]

Relatório do Code Reviewer:
[relatório da Etapa 2]

Analise as mudanças e sugira a mensagem de commit seguindo Conventional Commits com tipo `fix`.

## Etapa 4 — Apresentar resultado ao usuário

Consolide os resultados das três etapas e apresente ao usuário no seguinte formato:

## 🐛 Pipeline de correção concluída — [descrição curta do bug]

### Diagnóstico

[causa raiz identificada pelo Code Writer]

### Arquivos corrigidos

[lista de arquivos modificados]

### Revisão aplicada

[lista de correções do Code Reviewer, ou "Nenhuma correção adicional necessária"]

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

Se o Code Writer não conseguir identificar a causa raiz com os arquivos listados, pare e peça ao usuário mais contexto (logs de erro, stack trace, passos para reproduzir) antes de prosseguir.
Se a correção exigir criar novos arquivos (ex: um middleware que não existe), informe o usuário e confirme antes de prosseguir — isso pode indicar que o problema é maior do que um bug pontual.
Nunca execute git commit automaticamente — a confirmação é sempre manual.
