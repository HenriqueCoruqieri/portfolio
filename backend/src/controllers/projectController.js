import Project from "../models/Project.js"

export async function getAllProjects(req, res) {
  try {
    const projects = await Project.find().sort({ order: 1 })
    res.status(200).json(projects)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar projetos" })
  }
}

export async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" })
    }

    res.status(200).json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar o projeto" })
  }
}

export async function createProject(req, res) {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao adicionar novo projeto" })
  }
}

export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" })
    }

    res.status(200).json(project)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao atualizar projeto" })
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" })
    }

    res.status(200).json({ message: "Projeto deletado com sucesso" })
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao deletar projeto" })
  }
}
