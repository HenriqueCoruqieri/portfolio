import { useCallback, useEffect, useState } from "react"

import { loginRequest, meRequest } from "../services/authService"
import { AuthContext } from "./authContext"

const TOKEN_KEY = "admin_token"

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(
    () => localStorage.getItem(TOKEN_KEY) !== null,
  )

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
