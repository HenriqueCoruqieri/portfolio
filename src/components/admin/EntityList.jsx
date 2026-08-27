import { Button } from "../ui/button"

function EntityList({ entity, items, editingId, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="text-muted text-sm">{entity.emptyMessage}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item._id}
          className={`border-line flex items-start justify-between gap-4 rounded-lg border p-3 ${
            item._id === editingId ? "border-accent" : ""
          }`}
        >
          <div className="min-w-0">
            <p className="text-fg truncate text-sm font-medium">
              {entity.title(item)}
            </p>
            <p className="text-muted truncate text-sm">
              {entity.subtitle(item)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              onClick={() => onEdit(item)}
              className="bg-surface text-fg border-line border px-3 py-1.5 text-xs"
            >
              Editar
            </Button>
            <Button
              type="button"
              onClick={() => onDelete(item)}
              className="bg-surface border-line border px-3 py-1.5 text-xs text-red-400"
            >
              Excluir
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default EntityList
