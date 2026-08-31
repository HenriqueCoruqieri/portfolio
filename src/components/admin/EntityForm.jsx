import { useState } from "react"

import { toFormValues, toPayload } from "../../lib/entityFields"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { Textarea } from "../ui/textarea"
import ImageField from "./ImageField"

const FULL_WIDTH_TYPES = ["textarea", "image", "list"]

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
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2"
    >
      {entity.fields.map((field) => {
        const id = `${entity.key}-${field.name}`

        if (field.type === "checkbox") {
          return (
            <label
              key={field.name}
              htmlFor={id}
              className="border-line text-fg flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-medium sm:col-span-2"
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
          <div
            key={field.name}
            className={cn(
              "flex flex-col gap-1.5",
              FULL_WIDTH_TYPES.includes(field.type) && "sm:col-span-2",
            )}
          >
            <label htmlFor={id} className="text-fg text-sm font-medium">
              {field.label}
              {field.required && <span className="text-accent"> *</span>}
            </label>

            {field.type === "textarea" ? (
              <Textarea
                id={id}
                value={values[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => setValue(field.name, event.target.value)}
              />
            ) : field.type === "select" ? (
              <Select
                id={id}
                value={values[field.name]}
                required={field.required}
                onChange={(event) => setValue(field.name, event.target.value)}
              >
                <option value="">Selecione...</option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
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

            {field.help && (
              <p className="text-muted text-xs leading-relaxed">{field.help}</p>
            )}
          </div>
        )
      })}

      {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}

      <div className="border-line flex items-center gap-3 border-t pt-5 sm:col-span-2">
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
