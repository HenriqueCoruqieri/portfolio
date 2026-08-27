const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export async function apiRequest(
  path,
  { method = "GET", body, token, errorMessage } = {},
) {
  const headers = {}

  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message || errorMessage || "Erro ao comunicar com a API",
    )
  }

  return data
}
