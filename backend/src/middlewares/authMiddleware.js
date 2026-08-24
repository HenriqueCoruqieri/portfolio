import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: "Token inválido ou expirado" })
  }
}
