export const PROJECTS_HEADER = {
  title: "Projetos",
  subtitle: "Alguns trabalhos que tenho orgulho de compartilhar",
}

export const PROJECTS_EMPTY_MESSAGE = "Nenhum projeto cadastrado ainda."

export const ALL_PROJECTS_FILTER = "todos"
export const OTHER_PROJECTS_FILTER = "outros"

export const TYPE_APPS = [
  { value: "web app", label: "Web App", plural: "Web Apps" },
  { value: "saas", label: "SaaS", plural: "SaaS" },
  { value: "landing page", label: "Landing Page", plural: "Landing Pages" },
  { value: OTHER_PROJECTS_FILTER, label: "Outros", plural: "Outros" },
]

export const SPECIFIC_TYPE_APPS = TYPE_APPS.filter(
  (type) => type.value !== OTHER_PROJECTS_FILTER,
).map((type) => type.value)

export const PROJECT_FILTERS = [
  { value: ALL_PROJECTS_FILTER, label: "Todos" },
  ...TYPE_APPS.map(({ value, plural }) => ({ value, label: plural })),
]
