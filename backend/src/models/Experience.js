import mongoose from "mongoose"

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    type: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.model("Experience", experienceSchema)
