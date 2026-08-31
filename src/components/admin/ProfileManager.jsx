import { useState } from "react"

import { useResource } from "../../hooks/useResource"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { PencilIcon } from "../ui/icons"
import EntityForm from "./EntityForm"

function ProfileManager({ entity }) {
  const { items, loading, error, create, update } = useResource(entity.resource)

  const [editing, setEditing] = useState(false)
  const [feedback, setFeedback] = useState("")

  const profile = items[0] ?? null
  const readOnly = Boolean(profile) && !editing

  async function handleSubmit(payload) {
    if (profile) {
      await update(profile._id, payload)
    } else {
      await create(payload)
    }

    setEditing(false)
    setFeedback("Alterações salvas.")
  }

  function handleEdit() {
    setFeedback("")
    setEditing(true)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <CardTitle>{entity.formTitle}</CardTitle>
            <CardDescription>
              {readOnly
                ? entity.readOnlyMessage
                : "Campos marcados com * são obrigatórios."}
            </CardDescription>
          </div>

          {readOnly && (
            <Button
              type="button"
              onClick={handleEdit}
              aria-label={`Editar ${entity.singular}`}
              className="bg-surface text-fg border-line shrink-0 border p-2.5"
            >
              <PencilIcon className="size-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {loading && <p className="text-muted text-sm">Carregando...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}
          {feedback && <p className="text-muted text-sm">{feedback}</p>}

          {!loading && !error && (
            <EntityForm
              key={`${profile?._id ?? "new"}-${editing}`}
              entity={entity}
              item={profile}
              disabled={readOnly}
              onSubmit={handleSubmit}
              onCancel={() => setEditing(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileManager
