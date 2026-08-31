import { useState } from "react"

import learningImage from "../assets/learning.png"
import { Card } from "../components/ui/card"
import { LEARNING_CARD, SKILLS_HEADER } from "../data/skills"
import { useResource } from "../hooks/useResource"

function groupByCategory(skills) {
  const groups = new Map()

  for (const skill of skills) {
    if (!groups.has(skill.category)) {
      groups.set(skill.category, {
        name: skill.category,
        categoryOrder: skill.categoryOrder ?? 0,
        items: [],
      })
    }
    groups.get(skill.category).items.push(skill)
  }

  const list = [...groups.values()]
  list.sort((a, b) => a.categoryOrder - b.categoryOrder)

  for (const group of list) {
    group.items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  return list
}

function Skills() {
  const { items: skills, loading, error } = useResource("skills")
  const [activeCategory, setActiveCategory] = useState(null)

  const groups = groupByCategory(skills)
  const activeGroup =
    groups.find((group) => group.name === activeCategory) ?? groups[0]

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {SKILLS_HEADER.title}
        </h1>
        <p className="text-muted mt-2">{SKILLS_HEADER.subtitle}</p>
      </div>

      {loading && <p className="text-muted">Carregando skills...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && groups.length > 0 && (
        <div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Categorias de skills"
            className="flex flex-col gap-1"
          >
            {groups.map((group) => {
              const active = group.name === activeGroup.name

              return (
                <button
                  key={group.name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(group.name)}
                  className={
                    active
                      ? "border-accent bg-surface text-accent flex items-center gap-2.5 rounded-lg border-l-2 px-3 py-2 text-left text-sm font-medium transition-colors"
                      : "text-muted hover:text-fg flex items-center gap-2.5 rounded-lg border-l-2 border-transparent px-3 py-2 text-left text-sm font-medium transition-colors"
                  }
                >
                  <span
                    aria-hidden="true"
                    className={
                      active
                        ? "bg-accent size-1.5 shrink-0 rounded-full"
                        : "bg-muted size-1.5 shrink-0 rounded-full"
                    }
                  />
                  {group.name}
                </button>
              )
            })}
          </div>

          <Card className="gap-0 overflow-hidden py-0">
            <div className="border-line flex items-center justify-between gap-4 border-b px-6 py-4">
              <h2 className="text-fg font-semibold">{activeGroup.name}</h2>
              <span className="text-muted shrink-0 text-sm">
                {activeGroup.items.length}{" "}
                {activeGroup.items.length === 1 ? "tecnologia" : "tecnologias"}
              </span>
            </div>

            <div className="max-h-[max(18rem,calc(100dvh-31rem))] overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {activeGroup.items.map((skill) => (
                  <div
                    key={skill._id}
                    className="border-line bg-bg flex flex-col items-center justify-center gap-3 rounded-lg border p-4 text-center"
                  >
                    {skill.iconUrl ? (
                      <img
                        src={skill.iconUrl}
                        alt=""
                        loading="lazy"
                        className="size-10 shrink-0 object-contain"
                      />
                    ) : (
                      <div className="bg-surface text-muted flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold">
                        {skill.name.slice(0, 2)}
                      </div>
                    )}
                    <p className="text-fg w-full truncate text-sm font-medium">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="flex-row items-center justify-between gap-6 p-6 md:col-start-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-fg text-lg font-semibold">
                {LEARNING_CARD.title}
              </h3>
              <p className="text-muted max-w-xl text-sm leading-relaxed">
                {LEARNING_CARD.description}
              </p>
            </div>
            <img
              src={learningImage}
              alt=""
              className="hidden h-24 w-auto shrink-0 object-contain sm:block"
            />
          </Card>
        </div>
      )}
    </div>
  )
}

export default Skills
