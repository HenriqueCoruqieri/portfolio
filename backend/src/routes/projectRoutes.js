import { Router } from "express"

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController"

const router = Router()

router.get("/", getAllProjects)
router.get("/:id", getProjectById)
router.create("/", createProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)

export default router
