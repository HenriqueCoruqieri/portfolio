import { useState } from "react"

import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ChevronDownIcon } from "../components/ui/icons"
import {
  EXPERIENCE_EMPTY_MESSAGE,
  EXPERIENCE_HEADER,
  WORK_MODE_LABELS,
} from "../data/experience"
import { useResource } from "../hooks/useResource"
import { cn } from "../lib/utils"

function isCurrent(experience) {
  return Boolean(experience.current || !experience.endDate)
}

function getParagraphs(description) {
  return (description ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
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
  const [expandedIds, setExpandedIds] = useState(() => new Set())

  function toggleExpanded(id) {
    setExpandedIds((previous) => {
      const next = new Set(previous)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

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
            {experiences.map((experience, index) => {
              const paragraphs = getParagraphs(experience.description)
              const hasMultipleParagraphs = paragraphs.length > 1
              const isExpanded = expandedIds.has(experience._id)
              const descriptionId = `experience-description-${experience._id}`

              return (
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
                    <Card
                      className={cn(
                        "gap-4 py-5 transition-colors duration-300",
                        isExpanded && "border-accent",
                      )}
                    >
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
                        <div
                          id={descriptionId}
                          className="text-muted text-sm leading-relaxed"
                        >
                          {paragraphs[0] && <p>{paragraphs[0]}</p>}

                          {hasMultipleParagraphs && (
                            <div
                              aria-hidden={!isExpanded}
                              className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                                isExpanded
                                  ? "grid-rows-[1fr]"
                                  : "grid-rows-[0fr]",
                              )}
                            >
                              <div className="overflow-hidden">
                                <div className="flex flex-col gap-3 pt-3">
                                  {paragraphs
                                    .slice(1)
                                    .map((paragraph, paragraphIndex) => (
                                      <p key={paragraphIndex}>{paragraph}</p>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>

                      {hasMultipleParagraphs && (
                        <div className="border-line border-t px-5 pt-4">
                          <button
                            type="button"
                            onClick={() => toggleExpanded(experience._id)}
                            aria-expanded={isExpanded}
                            aria-controls={descriptionId}
                            className="focus-visible:ring-accent group flex w-full items-center justify-between gap-3 rounded-md outline-none focus-visible:ring-2"
                          >
                            <span
                              className={
                                isExpanded
                                  ? "text-fg text-sm font-medium"
                                  : "text-muted text-sm"
                              }
                            >
                              {isExpanded
                                ? "Recolher"
                                : "Ver descrição completa"}
                            </span>
                            <span
                              className={cn(
                                "border-line flex size-9 shrink-0 items-center justify-center rounded-lg border bg-transparent transition-colors duration-300",
                                isExpanded
                                  ? "bg-accent text-accent-fg border-accent"
                                  : "text-muted group-hover:text-fg group-hover:bg-line",
                              )}
                            >
                              <ChevronDownIcon
                                className={cn(
                                  "size-4 transition-transform duration-300",
                                  isExpanded && "rotate-180",
                                )}
                              />
                            </span>
                          </button>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Experience
