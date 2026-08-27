import { useCallback, useEffect, useState } from "react"

import {
  createResource,
  deleteResource,
  listResource,
  updateResource,
} from "../services/resourceService"
import { useAuth } from "./useAuth"

function byOrder(a, b) {
  return (a.order ?? 0) - (b.order ?? 0)
}

export function useResource(resource) {
  const { token } = useAuth()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = await listResource(resource)
        if (active) setItems(data)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [resource])

  const create = useCallback(
    async (data) => {
      const item = await createResource(resource, data, token)
      setItems((previous) => [...previous, item].sort(byOrder))
      return item
    },
    [resource, token],
  )

  const update = useCallback(
    async (id, data) => {
      const item = await updateResource(resource, id, data, token)
      setItems((previous) =>
        previous
          .map((entry) => (entry._id === id ? item : entry))
          .sort(byOrder),
      )
      return item
    },
    [resource, token],
  )

  const remove = useCallback(
    async (id) => {
      await deleteResource(resource, id, token)
      setItems((previous) => previous.filter((entry) => entry._id !== id))
    },
    [resource, token],
  )

  return { items, loading, error, create, update, remove }
}
