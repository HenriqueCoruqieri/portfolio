import { Router } from "express"

import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", verifyToken, getAllMessages)
router.post("/", sendMessage)
router.delete("/:id", verifyToken, deleteMessage)

export default router
