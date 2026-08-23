import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { connectDatabase } from "./config/database.js"
import projectRoutes from "./routes/projectRoutes.js"

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

const PORT = process.env.PORT || 3000

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
