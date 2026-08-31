import { useState } from "react"

import { Badge } from "../components/ui/badge"
import { Card } from "../components/ui/card"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { GithubIcon, MonitorIcon } from "../components/ui/icons"
import {
  ALL_PROJECTS_FILTER,
  OTHER_PROJECTS_FILTER,
  PROJECT_FILTERS,
  PROJECTS_EMPTY_MESSAGE,
  PROJECTS_HEADER,
  SPECIFIC_TYPE_APPS,
} from "../data/projects"
import { useResource } from "../hooks/useResource"
import { cn } from "../lib/utils"

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

function ProjectLinkButton({ url, label, tooltip, className, children }) {
  return (
    <span
      className="group relative flex"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        disabled={!url}
        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        aria-label={label}
        className={cn(
          "transition-transform enabled:hover:scale-125 disabled:cursor-not-allowed",
          className,
        )}
      >
        {children}
      </button>
      <span
        aria-hidden="true"
        className="bg-bg border-line text-fg pointer-events-none absolute top-1/2 right-full z-10 mr-2 -translate-y-1/2 rounded-md border px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
      >
        {tooltip}
      </span>
    </span>
  )
}

function byOrder(a, b) {
  return (a.order ?? 0) - (b.order ?? 0)
}

function Projects() {
  const { items, loading, error } = useResource("projects")
  const [filter, setFilter] = useState(ALL_PROJECTS_FILTER)
  const [selectedProject, setSelectedProject] = useState(null)

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
          <Card className="gap-0 overflow-hidden py-0">
            <div className="divide-line max-h-[calc(5*6.5rem+4px)] divide-y overflow-y-auto">
              {projects.map((project) => (
                <div
                  key={project._id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setSelectedProject(project)
                    }
                  }}
                  className="hover:bg-line/40 focus-visible:ring-accent flex cursor-pointer items-center gap-5 py-5 pr-8 pl-6 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset"
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

                  <div className="mr-20 hidden w-56 shrink-0 flex-wrap gap-2 lg:flex">
                    {project.technologies?.map((technology) => (
                      <Badge key={technology}>{technology}</Badge>
                    ))}
                  </div>

                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <ProjectLinkButton
                      url={project.githubUrl}
                      tooltip="Repositório"
                      label={
                        project.githubUrl
                          ? `Link do repositório de ${project.title}`
                          : `${project.title} sem repositório`
                      }
                      className={
                        project.githubUrl
                          ? "text-muted hover:text-fg"
                          : "text-muted/40"
                      }
                    >
                      <GithubIcon className="size-5" />
                    </ProjectLinkButton>

                    <ProjectLinkButton
                      url={project.demoUrl}
                      tooltip="App link"
                      label={
                        project.demoUrl
                          ? `Link do deploy de ${project.title}`
                          : `${project.title} sem deploy`
                      }
                      className={
                        project.demoUrl ? "text-emerald-500" : "text-red-500"
                      }
                    >
                      <MonitorIcon className="size-5" />
                    </ProjectLinkButton>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Dialog
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>{selectedProject?.title}</DialogTitle>
              {selectedProject?.typeApp && (
                <Badge
                  variant="accent"
                  className="shrink-0 tracking-wide uppercase"
                >
                  {selectedProject.typeApp}
                </Badge>
              )}
            </div>
            <DialogDescription>
              {selectedProject?.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            {selectedProject?.imageUrl && (
              <img
                src={selectedProject.imageUrl}
                alt=""
                className="bg-bg border-line h-64 w-full shrink-0 rounded-lg border object-cover object-top"
              />
            )}

            <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
              {selectedProject?.description}
            </p>

            {selectedProject?.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((technology) => (
                  <Badge key={technology}>{technology}</Badge>
                ))}
              </div>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Projects
