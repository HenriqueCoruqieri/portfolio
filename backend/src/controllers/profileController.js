import Profile from "../models/Profile.js"

export async function getProfile(req, res) {
  try {
    const profile = await Profile.find()
    res.status(200).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar Perfil" })
  }
}

export async function createProfile(req, res) {
  try {
    const profile = await Profile.create(req.body)
    res.status(201).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao adicionar novo Perfil" })
  }
}

export async function updateProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!profile) {
      return res.status(404).json({ message: "Perfil não encontrado" })
    }

    res.status(200).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao atualizar Perfil" })
  }
}

export async function deleteProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id)

    if (!profile) {
      return res.status(404).json({ message: "Perfil não encontrado" })
    }

    res.status(200).json({ message: "Perfil deletado com sucesso" })
  } catch (error) {
    console.error(error)

    res.status(500).json({ message: "Erro ao deletar Perfil" })
  }
}
