import dotenv from "dotenv"
import mongoose from "mongoose"

import User from "../models/User.js"

dotenv.config()

async function createAdmin() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error("Uso: node src/scripts/createAdmin.js <email> <senha>")
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL)

    const userCount = await User.countDocuments()

    if (userCount > 0) {
      console.error("Já existe um usuário cadastrado")
      process.exit(1)
    }

    const user = await User.create({ email, password })
    console.log(`Usuário "${user.email}" criado com sucesso!`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

createAdmin()
