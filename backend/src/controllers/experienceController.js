import Experience from "../models/Experience.js"

export async function getAllExperiences(req, res) {
  try {
    const experiences = await Experience.find().sort({ order: 1 })
    res.status(200).json(experiences)
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao buscar experiências" })
  }
}

export async function createExperience(req, res) {
  try {
    const experience = await Experience.create(req.body)
    res.status(201).json(experience)
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao criar nova experiência" })
  }
}

export async function updateExperience(req, res) {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )

    if (!experience) {
      return res.status(404).json({ message: "Experiência não localizada" })
    }

    res.status(200).json(experience)
  } catch (error) {
    console.error(error)

    res.status(500).json("Erro ao atualiza experiência")
  }
}

export async function deleteExperience(req, res) {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id)

    if (!experience) {
      return res.status(404).json({ message: "Experiência não encontrada" })
    }

    res.status(200).json({ message: "Experiência deletada com sucesso" })
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao excluir experiência" })
  }
}
