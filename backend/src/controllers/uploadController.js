import { handleControllerError } from "../errors/handleControllerError.js"

export async function uploadImageFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" })
    }

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

    res.status(201).json({ url })
  } catch (error) {
    handleControllerError(res, error, "Erro ao enviar imagem")
  }
}
