import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import multer from "multer"

const currentDir = path.dirname(fileURLToPath(import.meta.url))

export const UPLOADS_DIR = path.resolve(currentDir, "../../uploads")

fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
    cb(null, uniqueName)
  },
})

function fileFilter(req, file, cb) {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true)
    return
  }

  cb(new Error("Formato de imagem não suportado"))
}

const singleImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image")

export function uploadImage(req, res, next) {
  singleImage(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    next()
  })
}
