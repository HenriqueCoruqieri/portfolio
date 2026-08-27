import multer from "multer"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]

function fileFilter(req, file, cb) {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true)
    return
  }

  cb(new Error("Formato de imagem não suportado"))
}

const singleImage = multer({
  storage: multer.memoryStorage(),
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
