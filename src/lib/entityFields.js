function toFieldValue(field, value) {
  if (field.type === "checkbox") {
    return Boolean(value)
  }

  if (field.type === "list") {
    return Array.isArray(value) ? value.join(", ") : ""
  }

  if (field.type === "date") {
    return value ? value.slice(0, 10) : ""
  }

  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}

export function toFormValues(fields, item) {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      toFieldValue(field, item?.[field.name]),
    ]),
  )
}

function toPayloadValue(field, value) {
  if (field.type === "checkbox") {
    return Boolean(value)
  }

  if (field.type === "list") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
  }

  if (field.type === "number") {
    return value === "" ? 0 : Number(value)
  }

  if (field.type === "date") {
    return value === "" ? null : value
  }

  return value.trim()
}

export function toPayload(fields, values) {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      toPayloadValue(field, values[field.name]),
    ]),
  )
}
