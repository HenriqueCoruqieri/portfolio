import { CONTACT_MAIL, isMailConfigured, resend } from "../config/resend.js"
import Message from "../models/Message.js"

export function buildEmailBody({ name, message }) {
  const greeting = name?.trim()
    ? `Olá, meu nome é ${name.trim()}.

`
    : ""
  return `${greeting}${message}`
}

async function notifyByEmail({ name, email, subject, message }) {
  if (!isMailConfigured()) {
    console.error("Resend não configurado: e-mail de contato não enviado")
    return
  }

  const { error } = await resend.emails.send({
    from: CONTACT_MAIL.from,
    to: CONTACT_MAIL.to,
    replyTo: email,
    subject,
    text: buildEmailBody({ name, message }),
  })

  if (error) {
    console.error("Falha ao enviar e-mail de contato: ", error)
  }
}

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
    const { name, email, subject, message: text } = req.body

    const message = await Message.create({
      name,
      email,
      subject,
      message: text,
    })

    await notifyByEmail({ name, email, subject, message: text })

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
