import { Router } from "express"

import {
  deleteMessage,
  getMessage,
  sendMessage,
} from "../controllers/messageController.js"

const router = Router()

router.get("/", getMessage)
router.post("/", sendMessage)
router.delete("/:id", deleteMessage)

export default router
