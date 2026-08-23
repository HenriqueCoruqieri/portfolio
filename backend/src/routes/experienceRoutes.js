import { Router } from "express"

import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
} from "../controllers/experienceController.js"

const router = Router()

router.get("/", getAllExperiences)
router.post("/", createExperience)
router.patch("/:id", updateExperience)
router.delete("/:id", deleteExperience)

export default router
