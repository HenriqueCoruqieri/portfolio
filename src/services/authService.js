import { apiRequest } from "./apiClient"

export async function loginRequest(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
    errorMessage: "Erro ao realizar login",
  })
}

export async function meRequest(token) {
  return apiRequest("/auth/me", {
    token,
    errorMessage: "Token inválido ou expirado",
  })
}
