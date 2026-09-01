import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const apiKey = process.env.RESEND_API_KEY

export const resend = apiKey ? new Resend(apiKey) : null

export const CONTACT_MAIL = {
  from: process.env.RESEND_FROM,
  to: process.env.CONTACT_EMAIL_TO,
}

export function isMailConfigured() {
  return Boolean(resend && CONTACT_MAIL.from && CONTACT_MAIL.to)
}
