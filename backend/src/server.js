import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { connectDatabase } from "./config/database.js"
import experienceRoutes from "./routes/experienceRoutes.js"
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

const PORT = process.env.PORT || 3000

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
