import learningImage from "../assets/learning.png"
import { Card } from "../components/ui/card"
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area"
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
  const groups = groupByCategory(skills)

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {SKILLS_HEADER.title}
        </h1>
        <p className="text-muted mt-2">{SKILLS_HEADER.subtitle}</p>
      </header>

      {loading && <p className="text-muted">Carregando skills...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <section key={group.name}>
              <h2 className="text-fg mb-4 text-lg font-semibold">
                {group.name}
              </h2>
              <ScrollArea className="w-full" type="hover">
                <div className="flex gap-4 pt-4">
                  {group.items.map((skill) => (
                    <Card
                      key={skill._id}
                      className="min-h-36 w-44 shrink-0 items-center justify-center gap-3 p-4 text-center"
                    >
                      {skill.iconUrl ? (
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          loading="lazy"
                          className="h-11 w-11 object-contain"
                        />
                      ) : (
                        <div className="bg-bg text-muted flex h-11 w-11 items-center justify-center rounded-lg text-lg font-semibold">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <p className="text-fg text-sm font-medium">
                        {skill.name}
                      </p>
                    </Card>
                  ))}
                </div>
                <ScrollBar
                  orientation="horizontal"
                  className="top-0! bottom-auto!"
                />
              </ScrollArea>
            </section>
          ))}

          <Card className="flex-row items-center justify-between gap-6 p-6">
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
              className="hidden h-32 w-auto object-contain sm:block"
            />
          </Card>
        </div>
      )}
    </div>
  )
}

export default Skills
