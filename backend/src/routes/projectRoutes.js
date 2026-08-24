import { Router } from "express"

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", getAllProjects)
router.get("/:id", getProjectById)
router.post("/", verifyToken, createProject)
router.patch("/:id", verifyToken, updateProject)
router.delete("/:id", verifyToken, deleteProject)

export default router
