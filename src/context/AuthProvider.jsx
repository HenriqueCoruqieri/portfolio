import { useCallback, useEffect, useState } from "react"

import { loginRequest, meRequest } from "../services/authService"
import { AuthContext } from "./authContext"

const TOKEN_KEY = "admin_token"

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  // Só há "carregando" quando existe um token salvo para revalidar no mount.
  const [loading, setLoading] = useState(
    () => localStorage.getItem(TOKEN_KEY) !== null,
  )

  // Revalida um token existente contra a API (GET /me) ao montar/trocar o token.
  useEffect(() => {
    if (!token) return

    let active = true

    meRequest(token)
      .then((data) => {
        if (active) setUser(data)
      })
      .catch(() => {
        if (!active) return
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        setUser(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  const login = useCallback(async (email, password) => {
    const { token: newToken } = await loginRequest(email, password)
    localStorage.setItem(TOKEN_KEY, newToken)
    // Credenciais já validadas pela API — assume o usuário sem esperar o /me.
    setUser({ email, role: "admin" })
    setLoading(false)
    setToken(newToken)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
