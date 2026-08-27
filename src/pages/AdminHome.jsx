import { Button } from "../components/ui/button"
import { useAuth } from "../hooks/useAuth"

// Placeholder da área protegida — o painel (CRUD) será implementado depois.
function AdminHome() {
  const { user, logout } = useAuth()

  return (
    <div className="bg-bg text-fg min-h-screen px-6 py-16">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <h1 className="text-fg text-3xl font-bold tracking-tight">
            Painel administrativo
          </h1>
          <p className="text-muted mt-2">
            Autenticado como {user?.email}. O painel será implementado em breve.
          </p>
        </div>
        <Button
          type="button"
          onClick={logout}
          className="bg-surface text-fg border-line border"
        >
          Sair
        </Button>
      </div>
    </div>
  )
}

export default AdminHome
