export function handleControllerError(res, error, message) {
  console.error(error)

  if (error.name === "ValidationError") {
    const fields = Object.keys(error.errors).join(", ")
    return res
      .status(400)
      .json({ message: `Campos inválidos ou ausentes: ${fields}` })
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Identificador inválido" })
  }

  return res.status(500).json({ message })
}
