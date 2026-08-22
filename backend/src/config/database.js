import mongoose from "mongoose"

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
  } catch (error) {
    console.error("MongoDB connection failed: ", error)
    process.exit(1)
  }
}
