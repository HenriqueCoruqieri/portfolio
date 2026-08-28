import { Badge } from "../components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  EXPERIENCE_EMPTY_MESSAGE,
  EXPERIENCE_HEADER,
  WORK_MODE_LABELS,
} from "../data/experience"
import { useResource } from "../hooks/useResource"

function isCurrent(experience) {
  return Boolean(experience.current || !experience.endDate)
}

function startYear(experience) {
  return new Date(experience.startDate).getFullYear()
}

function formatPeriod(experience) {
  const start = startYear(experience)

  if (isCurrent(experience)) {
    return `${start} · Atual`
  }

  return `${start} · ${new Date(experience.endDate).getFullYear()}`
}

function byMostRecent(a, b) {
  return new Date(b.startDate) - new Date(a.startDate)
}

function Experience() {
  const { items, loading, error } = useResource("experiences")
  const experiences = [...items].sort(byMostRecent)

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-12">
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {EXPERIENCE_HEADER.title}
        </h1>
        <p className="text-muted mt-2">{EXPERIENCE_HEADER.subtitle}</p>
      </div>

      {loading && <p className="text-muted">Carregando experiências...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && experiences.length === 0 && (
        <p className="text-muted">{EXPERIENCE_EMPTY_MESSAGE}</p>
      )}

      {!loading && !error && experiences.length > 0 && (
        <div className="relative">
          <div
            aria-hidden="true"
            className="bg-line absolute inset-y-0 left-4 w-px md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10 md:gap-16">
            {experiences.map((experience, index) => (
              <div
                key={experience._id}
                className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <div className="absolute top-6 left-4 flex -translate-x-1/2 flex-col items-center md:left-1/2">
                  <span
                    className={
                      isCurrent(experience)
                        ? "ring-bg h-3 w-3 rounded-full bg-emerald-500 ring-4"
                        : "bg-accent ring-bg h-3 w-3 rounded-full ring-4"
                    }
                  />
                  <span className="bg-bg text-muted mt-1 px-1 text-xs">
                    {startYear(experience)}
                  </span>
                </div>

                <div
                  className={
                    index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                  }
                >
                  <Card className="gap-4 py-5">
                    <CardHeader className="gap-3 px-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-muted text-sm">
                          {formatPeriod(experience)}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          {WORK_MODE_LABELS[experience.workMode] && (
                            <Badge variant="accent">
                              {WORK_MODE_LABELS[experience.workMode]}
                            </Badge>
                          )}
                          {isCurrent(experience) && (
                            <Badge
                              variant="success"
                              className="tracking-wide uppercase"
                            >
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-current"
                              />
                              Atual
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <CardTitle className="text-lg">
                          {experience.title}
                        </CardTitle>
                        <p className="text-accent text-sm font-medium">
                          {experience.company}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="px-5">
                      <CardDescription>
                        {experience.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Experience
