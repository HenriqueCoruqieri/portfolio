import { cloudinary } from "../config/cloudinary.js"
import { handleControllerError } from "../errors/handleControllerError.js"

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio" },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result.secure_url)
      },
    )

    stream.end(buffer)
  })
}

export async function uploadImageFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" })
    }

    const url = await uploadToCloudinary(req.file.buffer)

    res.status(201).json({ url })
  } catch (error) {
    handleControllerError(res, error, "Erro ao enviar imagem")
  }
}
