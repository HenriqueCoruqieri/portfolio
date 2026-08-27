import jwt from "jsonwebtoken"

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const isValid =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD

    if (!isValid) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao realizar login" })
  }
}

export async function me(req, res) {
  try {
    res.status(200).json({ email: process.env.ADMIN_EMAIL, role: "admin" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao verificar autenticação" })
  }
}
