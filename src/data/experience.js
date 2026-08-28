export const EXPERIENCE_HEADER = {
  title: "Experiência",
  subtitle: "Minha trajetória profissional",
}

export const EXPERIENCE_EMPTY_MESSAGE = "Nenhuma experiência cadastrada ainda."

export const WORK_MODES = [
  { value: "presencial", label: "Presencial" },
  { value: "remoto", label: "Remoto" },
  { value: "hibrido", label: "Híbrido" },
]

export const WORK_MODE_LABELS = Object.fromEntries(
  WORK_MODES.map((mode) => [mode.value, mode.label]),
)
