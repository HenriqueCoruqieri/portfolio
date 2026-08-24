import { Router } from "express"

import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", getProfile)
router.post("/", verifyToken, createProfile)
router.patch("/:id", verifyToken, updateProfile)
router.delete("/:id", verifyToken, deleteProfile)

export default router
