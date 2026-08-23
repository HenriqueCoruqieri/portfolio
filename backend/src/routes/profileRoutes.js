import { Router } from "express"

import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js"

const router = Router()

router.get("/", getProfile)
router.post("/", createProfile)
router.patch("/:id", updateProfile)
router.delete("/:id", deleteProfile)

export default router
