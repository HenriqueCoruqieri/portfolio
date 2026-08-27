import { apiRequest } from "./apiClient"

export function listResource(resource) {
  return apiRequest(`/${resource}`)
}

export function createResource(resource, data, token) {
  return apiRequest(`/${resource}`, { method: "POST", body: data, token })
}

export function updateResource(resource, id, data, token) {
  return apiRequest(`/${resource}/${id}`, {
    method: "PATCH",
    body: data,
    token,
  })
}

export function deleteResource(resource, id, token) {
  return apiRequest(`/${resource}/${id}`, { method: "DELETE", token })
}
