import { useState } from "react"

import { useResource } from "../../hooks/useResource"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import EntityForm from "./EntityForm"
import EntityList from "./EntityList"

function EntityManager({ entity }) {
  const { items, loading, error, create, update, remove } = useResource(
    entity.resource,
  )

  const [editingItem, setEditingItem] = useState(null)
  const [formVersion, setFormVersion] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [listError, setListError] = useState("")

  async function handleSubmit(payload) {
    setListError("")

    if (editingItem) {
      await update(editingItem._id, payload)
      setEditingItem(null)
      setFeedback("Alterações salvas.")
      return
    }

    await create(payload)
    setFormVersion((previous) => previous + 1)
    setFeedback(entity.createdMessage)
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Excluir "${entity.title(item)}"? Essa ação não pode ser desfeita.`,
    )

    if (!confirmed) return

    setFeedback("")
    setListError("")

    try {
      await remove(item._id)

      if (editingItem?._id === item._id) {
        setEditingItem(null)
      }
    } catch (err) {
      setListError(err.message)
    }
  }

  function handleEdit(item) {
    setFeedback("")
    setListError("")
    setEditingItem(item)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingItem ? `Editando ${entity.singular}` : entity.newLabel}
          </CardTitle>
          <CardDescription>
            Campos marcados com * são obrigatórios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EntityForm
            key={editingItem?._id ?? `new-${formVersion}`}
            entity={entity}
            item={editingItem}
            onSubmit={handleSubmit}
            onCancel={() => setEditingItem(null)}
          />
        </CardContent>
      </Card>

      <div className="relative">
        <Card className="overflow-hidden lg:absolute lg:inset-x-0 lg:top-0 lg:max-h-full">
          <CardHeader className="shrink-0">
            <CardTitle>{entity.listTitle}</CardTitle>
            <CardDescription>
              {loading ? "Carregando..." : `${items.length} no total.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-col gap-3 overflow-y-auto">
            {feedback && <p className="text-muted text-sm">{feedback}</p>}
            {(error || listError) && (
              <p className="text-sm text-red-400">{error || listError}</p>
            )}

            {!loading && !error && (
              <EntityList
                entity={entity}
                items={items}
                editingId={editingItem?._id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EntityManager
