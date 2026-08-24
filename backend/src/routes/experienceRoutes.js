import { Router } from "express"

import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
} from "../controllers/experienceController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", getAllExperiences)
router.post("/", verifyToken, createExperience)
router.patch("/:id", verifyToken, updateExperience)
router.delete("/:id", verifyToken, deleteExperience)

export default router
