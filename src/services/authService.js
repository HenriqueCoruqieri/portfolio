const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.message || "Erro ao realizar login")
  }

  return response.json()
}

export async function meRequest(token) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error("Token inválido ou expirado")
  }

  return response.json()
}
