import { BriefcaseIcon, CheckCircleIcon, HeartIcon } from "../ui/icons"

const STATS = [
  { value: "+3", label: "Anos de experiência", Icon: BriefcaseIcon },
  { value: "+15", label: "Clientes satisfeitos", Icon: HeartIcon },
  { value: "+20", label: "Projetos concluídos", Icon: CheckCircleIcon },
]

function About() {
  return (
    <section
      id="sobre"
      className="border-line mx-auto max-w-6xl border-t px-6 py-16"
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-fg text-3xl font-bold tracking-tight">
            Sobre mim
          </h2>
          <p className="text-muted mt-6 max-w-md leading-relaxed">
            Sou desenvolvedor Full Stack apaixonado por criar soluções digitais
            eficientes e escaláveis. Atualmente, foco em desenvolver aplicações
            com Next.js, React, TypeScript, Node.js e PostgreSQL.
          </p>
          <a
            href="#experiencia"
            className="border-line text-fg hover:bg-surface mt-8 inline-flex rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            Saiba mais sobre mim
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {STATS.map(({ value, label, Icon }) => (
            <div
              key={label}
              className="border-line bg-surface flex items-center gap-4 rounded-xl border p-5"
            >
              <span className="rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-fg text-xl font-bold">{value}</p>
                <p className="text-muted text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
