import { Router } from "express"

import {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "../controllers/skillController.js"

const router = Router()

router.get("/", getAllSkills)
router.post("/", createSkill)
router.patch("/:id", updateSkill)
router.delete("/:id", deleteSkill)
