import {
  NextIcon,
  NodeIcon,
  PostgresIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "../ui/icons"

const TECHNOLOGIES = [
  { name: "Next.js", Icon: NextIcon },
  { name: "React", Icon: ReactIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "TailwindCSS", Icon: TailwindIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "PostgreSQL", Icon: PostgresIcon },
]

function Technologies() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 pt-0 pb-16">
      <p className="text-muted mb-8 text-sm font-semibold tracking-[0.2em] uppercase">
        Tecnologias
      </p>
      <div className="flex flex-wrap items-center gap-10">
        {TECHNOLOGIES.map(({ name, Icon }) => (
          <Icon
            key={name}
            role="img"
            aria-label={name}
            className="text-fg size-11"
          />
        ))}
      </div>
    </section>
  )
}

export default Technologies
