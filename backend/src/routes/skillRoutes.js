import { Router } from "express"

import {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "../controllers/skillController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", getAllSkills)
router.post("/", verifyToken, createSkill)
router.patch("/:id", verifyToken, updateSkill)
router.delete("/:id", verifyToken, deleteSkill)

export default router
