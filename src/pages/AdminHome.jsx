import { useState } from "react"
import { useNavigate } from "react-router-dom"

import EntityManager from "../components/admin/EntityManager"
import { Button } from "../components/ui/button"
import { ADMIN_ENTITIES } from "../data/adminEntities"
import { useAuth } from "../hooks/useAuth"

function AdminHome() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeKey, setActiveKey] = useState(ADMIN_ENTITIES[0].key)

  const activeEntity = ADMIN_ENTITIES.find((entity) => entity.key === activeKey)

  return (
    <div className="bg-bg text-fg min-h-screen px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-fg text-3xl font-bold tracking-tight">
              Painel administrativo
            </h1>
            <p className="text-muted mt-2">
              Autenticado como {user?.email}. O conteúdo cadastrado aqui
              alimenta as páginas públicas do portfólio.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="bg-surface text-fg border-line border"
            >
              Home
            </Button>
            <Button
              type="button"
              onClick={logout}
              className="bg-surface text-fg border-line border"
            >
              Sair
            </Button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Entidades do portfólio"
          className="border-line flex flex-wrap gap-2 border-b pb-3"
        >
          {ADMIN_ENTITIES.map((entity) => (
            <Button
              key={entity.key}
              type="button"
              role="tab"
              aria-selected={entity.key === activeKey}
              onClick={() => setActiveKey(entity.key)}
              className={
                entity.key === activeKey
                  ? ""
                  : "bg-surface text-muted border-line hover:text-fg border"
              }
            >
              {entity.label}
            </Button>
          ))}
        </div>

        <EntityManager key={activeEntity.key} entity={activeEntity} />
      </div>
    </div>
  )
}

export default AdminHome
