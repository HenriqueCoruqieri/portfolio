import Message from "../models/Message.js"

export async function getAllMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar mensagem" })
  }
}

export async function sendMessage(req, res) {
  try {
    const message = await Message.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao enviar mensagem" })
  }
}

export async function deleteMessage(req, res) {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)

    if (!message) {
      return res
        .status(404)
        .json({ message: "Não foi possível enviar a mensagem" })
    }

    res.status(200).json({ message: "Mensagem deletada com sucesso" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao enviar mensagem" })
  }
}
