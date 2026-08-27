import { useState } from "react"

import { toFormValues, toPayload } from "../../lib/entityFields"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import ImageField from "./ImageField"

function EntityForm({ entity, item, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(entity.fields, item))
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function setValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      await onSubmit(toPayload(entity.fields, values))
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {entity.fields.map((field) => {
        const id = `${entity.key}-${field.name}`

        if (field.type === "checkbox") {
          return (
            <label
              key={field.name}
              htmlFor={id}
              className="text-fg flex items-center gap-2 text-sm font-medium"
            >
              <input
                id={id}
                type="checkbox"
                checked={values[field.name]}
                onChange={(event) => setValue(field.name, event.target.checked)}
                className="border-line accent-accent size-4 rounded"
              />
              {field.label}
            </label>
          )
        }

        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-fg text-sm font-medium">
              {field.label}
              {field.required && <span className="text-muted"> *</span>}
            </label>

            {field.type === "textarea" ? (
              <Textarea
                id={id}
                value={values[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => setValue(field.name, event.target.value)}
              />
            ) : field.type === "image" ? (
              <ImageField
                id={id}
                value={values[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(url) => setValue(field.name, url)}
              />
            ) : (
              <Input
                id={id}
                type={field.type === "list" ? "text" : field.type}
                value={values[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => setValue(field.name, event.target.value)}
              />
            )}

            {field.help && <p className="text-muted text-xs">{field.help}</p>}
          </div>
        )
      })}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="mt-2 flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Salvando..."
            : item
              ? "Salvar alterações"
              : "Adicionar"}
        </Button>

        {item && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-surface text-fg border-line border"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}

export default EntityForm
