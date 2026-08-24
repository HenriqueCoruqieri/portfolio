import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao realizar login" })
  }
}
