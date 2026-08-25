# Backend — Contexto Específico

Complementa o `CLAUDE.md` da raiz com detalhes de implementação exclusivos do backend.

---

## Módulos e Imports

O backend usa **ESM** (`"type": "module"` no `package.json`). Todo import deve incluir a extensão `.js`:

```js
import Project from "../models/Project.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
```

---

## Dependências Instaladas

| Pacote          | Finalidade                              |
|-----------------|-----------------------------------------|
| `express`       | Framework HTTP (v5)                     |
| `mongoose`      | ODM para MongoDB                        |
| `dotenv`        | Variáveis de ambiente via `.env`        |
| `cors`          | Habilitar CORS na API                   |
| `jsonwebtoken`  | Geração e verificação de JWT            |
| `bcryptjs`      | Hash de senhas                          |

---

## Padrão de Model (Mongoose)

```js
import mongoose from "mongoose"

const exemploSchema = new mongoose.Schema(
  {
    campo: { type: String, required: true },
    // ...
  },
  { timestamps: true }, // sempre incluir timestamps
)

export default mongoose.model("Exemplo", exemploSchema)
```

- Sempre incluir `{ timestamps: true }` — gera `createdAt` e `updatedAt` automaticamente.
- Usar `default export` para o model.
- Nome do model em PascalCase singular: `"Project"`, `"Experience"`, `"Skill"`.

---

## Padrão de Controller

```js
import Recurso from "../models/Recurso.js"

// Named exports — nunca default export em controllers
export async function getAll(req, res) {
  try {
    const items = await Recurso.find()
    res.status(200).json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar recursos" })
  }
}

export async function getById(req, res) {
  try {
    const item = await Recurso.findById(req.params.id)
    if (!item) return res.status(404).json({ message: "Recurso não encontrado" })
    res.status(200).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar o recurso" })
  }
}

export async function create(req, res) {
  try {
    const item = await Recurso.create(req.body)
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao criar recurso" })
  }
}

export async function update(req, res) {
  try {
    const item = await Recurso.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ message: "Recurso não encontrado" })
    res.status(200).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao atualizar recurso" })
  }
}

export async function remove(req, res) {
  try {
    const item = await Recurso.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: "Recurso não encontrado" })
    res.status(200).json({ message: "Recurso deletado com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao deletar recurso" })
  }
}
```

**Regras obrigatórias:**
- Sempre `named exports` (não `export default`).
- Sempre `try/catch` em cada função.
- Sempre `console.error(error)` no catch — nunca silenciar erros.
- Mensagens de erro em **português**.
- Verificar se o documento existe antes de retornar 200 — retornar 404 se não encontrado.
- `findByIdAndUpdate` sempre com `{ new: true, runValidators: true }`.

---

## Padrão de Routes

```js
import { Router } from "express"
import { create, getAll, getById, remove, update } from "../controllers/recursoController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

// Rotas públicas (leitura)
router.get("/", getAll)
router.get("/:id", getById)

// Rotas protegidas (escrita) — sempre com verifyToken
router.post("/", verifyToken, create)
router.patch("/:id", verifyToken, update)
router.delete("/:id", verifyToken, remove)

export default router
```

**Regras:**
- Usar `patch` (não `put`) para atualizações parciais.
- Rotas de leitura (`GET`) são públicas.
- Rotas de escrita (`POST`, `PATCH`, `DELETE`) exigem `verifyToken`.
- `default export` para o router.

---

## Registro de Rotas no server.js

Ao criar um novo recurso, registrar a rota em `src/server.js`:

```js
import recursoRoutes from "./routes/recursoRoutes.js"
// ...
app.use("/api/recursos", recursoRoutes)
```

- Prefixo sempre `/api/` seguido do nome do recurso em **plural e minúsculas**.
- Manter a ordem de imports e registros consistente com os existentes.

---

## Variáveis de Ambiente

Definidas no arquivo `backend/.env` (não commitado). As variáveis usadas são:

```
MONGODB_URI=
JWT_SECRET=
PORT=
```

Nunca hardcodar valores de configuração — sempre usar `process.env.VARIAVEL`.

---

## Scripts Disponíveis

```bash
# Desenvolvimento (hot reload nativo do Node.js)
npm run dev

# Produção
npm start
```
