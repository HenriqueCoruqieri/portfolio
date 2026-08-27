import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
