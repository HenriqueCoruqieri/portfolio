import { Router } from "express"

import { login, me } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

// Rota pública — autentica contra as credenciais do admin (env)
router.post("/login", login)

// Rota protegida — valida se o token ainda é válido
router.get("/me", verifyToken, me)

export default router
