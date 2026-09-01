import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .max(80, "O nome deve ter no máximo 80 caracteres.")
    .optional(),
  email: z.email("Informe um e-mail válido."),
  subject: z
    .string()
    .trim()
    .min(3, "Informe um título com pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(1000, "A mensagem deve ter no máximo 1000 caracteres."),
})

export function validateContact(values) {
  const result = contactSchema.safeParse(values)

  if (result.success) {
    return { data: result.data, errors: {} }
  }

  const errors = {}

  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field && !errors[field]) {
      errors[field] = issue.message
    }
  }

  return { data: null, errors }
}
