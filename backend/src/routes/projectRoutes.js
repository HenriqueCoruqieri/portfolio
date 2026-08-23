import { Router } from "express"

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js"

const router = Router()

router.get("/", getAllProjects)
router.get("/:id", getProjectById)
router.post("/", createProject)
router.patch("/:id", updateProject)
router.delete("/:id", deleteProject)

export default router
