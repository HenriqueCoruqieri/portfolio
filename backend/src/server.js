import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { connectDatabase } from "./config/database.js"
import authRoutes from "./routes/authRoutes.js"
import experienceRoutes from "./routes/experienceRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import skillRoutes from "./routes/skillRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running",
  })
})

app.use("/api/projects", projectRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/experiences", experienceRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 3000

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
