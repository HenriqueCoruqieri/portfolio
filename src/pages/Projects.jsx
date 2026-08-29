import { useState } from "react"

import { Badge } from "../components/ui/badge"
import { Card } from "../components/ui/card"
import { GithubIcon, VercelIcon } from "../components/ui/icons"
import {
  ALL_PROJECTS_FILTER,
  OTHER_PROJECTS_FILTER,
  PROJECT_FILTERS,
  PROJECTS_EMPTY_MESSAGE,
  PROJECTS_HEADER,
  SPECIFIC_TYPE_APPS,
} from "../data/projects"
import { useResource } from "../hooks/useResource"

function normalizeType(project) {
  return (project.typeApp ?? "").trim().toLowerCase()
}

function matchesFilter(project, filter) {
  if (filter === ALL_PROJECTS_FILTER) {
    return true
  }

  const type = normalizeType(project)

  if (filter === OTHER_PROJECTS_FILTER) {
    return !SPECIFIC_TYPE_APPS.includes(type)
  }

  return type === filter
}

function byOrder(a, b) {
  return (a.order ?? 0) - (b.order ?? 0)
}

function Projects() {
  const { items, loading, error } = useResource("projects")
  const [filter, setFilter] = useState(ALL_PROJECTS_FILTER)

  const projects = [...items]
    .sort(byOrder)
    .filter((project) => matchesFilter(project, filter))

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {PROJECTS_HEADER.title}
        </h1>
        <p className="text-muted mt-2">{PROJECTS_HEADER.subtitle}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            aria-pressed={filter === option.value}
            className={
              filter === option.value
                ? "bg-accent text-accent-fg rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-colors"
                : "border-line text-muted hover:text-fg rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted mt-8">Carregando projetos...</p>}
      {error && <p className="mt-8 text-sm text-red-400">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="text-muted mt-8">{PROJECTS_EMPTY_MESSAGE}</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="mt-8">
          <Card className="divide-line gap-0 divide-y overflow-hidden py-0">
            {projects.map((project) => (
              <div
                key={project._id}
                className="hover:bg-line/40 flex items-center gap-5 px-6 py-5 transition-colors"
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt=""
                    loading="lazy"
                    className="bg-bg h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="bg-bg h-16 w-24 shrink-0 rounded-lg" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-fg truncate font-semibold">
                      {project.title}
                    </h2>
                    {project.typeApp && (
                      <Badge
                        variant="accent"
                        className="shrink-0 tracking-wide uppercase"
                      >
                        {project.typeApp}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted mt-1 truncate text-sm">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="hidden w-56 shrink-0 flex-wrap gap-2 lg:flex">
                  {project.technologies?.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </div>

                <div className="flex shrink-0 flex-col items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositório de ${project.title}`}
                      className="text-muted hover:text-fg transition-colors"
                    >
                      <GithubIcon className="size-5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Demo de ${project.title}`}
                      className="text-muted hover:text-fg transition-colors"
                    >
                      <VercelIcon className="size-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  )
}

export default Projects
