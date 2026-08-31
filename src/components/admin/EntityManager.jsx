import { useState } from "react"

import { useResource } from "../../hooks/useResource"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { SearchInput } from "../ui/search-input"
import EntityForm from "./EntityForm"
import EntityList from "./EntityList"

function normalize(text) {
  return String(text)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

function EntityManager({ entity }) {
  const { items, loading, error, create, update, remove } = useResource(
    entity.resource,
  )

  const [search, setSearch] = useState("")
  const [editingItem, setEditingItem] = useState(null)
  const [formVersion, setFormVersion] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [listError, setListError] = useState("")

  const term = normalize(search.trim())
  const visibleItems = term
    ? items.filter((item) => normalize(entity.title(item)).includes(term))
    : items

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
              {loading
                ? "Carregando..."
                : term
                  ? `${visibleItems.length} de ${items.length}.`
                  : `${items.length} no total.`}
            </CardDescription>

            {!loading && !error && (
              <SearchInput
                id={`${entity.key}-search`}
                value={search}
                onValueChange={setSearch}
                aria-label={`Buscar ${entity.singular}`}
                placeholder={`Buscar ${entity.singular}...`}
                className="mt-2"
              />
            )}
          </CardHeader>
          <CardContent className="flex min-h-0 flex-col gap-3 overflow-y-auto">
            {feedback && <p className="text-muted text-sm">{feedback}</p>}
            {(error || listError) && (
              <p className="text-sm text-red-400">{error || listError}</p>
            )}

            {!loading && !error && (
              <EntityList
                entity={entity}
                items={visibleItems}
                emptyMessage={
                  term
                    ? `Nenhum resultado para "${search.trim()}".`
                    : entity.emptyMessage
                }
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
