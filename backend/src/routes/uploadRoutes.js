import { Router } from "express"

import { uploadImageFile } from "../controllers/uploadController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { uploadImage } from "../middlewares/upload.js"

const router = Router()

router.post("/", verifyToken, uploadImage, uploadImageFile)

export default router
