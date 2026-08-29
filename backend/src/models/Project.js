import mongoose from "mongoose"

export const TYPE_APPS = ["web app", "saas", "landing page", "outros"]

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    typeApp: {
      type: String,
      enum: {
        values: TYPE_APPS,
        message: "Tipo de sistema inválido",
      },
      required: true,
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    technologies: [String],
    imageUrl: { type: String },
    githubUrl: { type: String },
    demoUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.model("Project", projectSchema)
