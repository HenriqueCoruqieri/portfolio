import { apiRequest } from "./apiClient"

export function uploadImage(file, token) {
  const formData = new FormData()
  formData.append("image", file)

  return apiRequest("/uploads", {
    method: "POST",
    body: formData,
    token,
    errorMessage: "Erro ao enviar imagem",
  })
}
