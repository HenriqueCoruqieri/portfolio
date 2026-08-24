import { Router } from "express"

import { login } from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/login", verifyToken, login)

export default router
