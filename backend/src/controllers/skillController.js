import Skill from "../models/Skill.js"

export async function getAllSkills(req, res) {
  try {
    const skills = await Skill.find().sort({ order: 1 })
    res.status(200).json(skills)
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao buscar skills" })
  }
}

export async function createSkill(req, res) {
  try {
    const skill = await Skill.create(req.body)
    res.status(200).json(skill)
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao criar skill" })
  }
}

export async function updateSkill(req, res) {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!skill) {
      return res.status(404).json({ message: "Skill não encontrada" })
    }

    res.status(200).json(skill)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao atualizar skill" })
  }
}

export async function deleteSkill(req, res) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({ message: "Skill não encontrada" })
    }

    res.status(200).json({ message: "Skill deletada com sucesso" })
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao deletar skill" })
  }
}
