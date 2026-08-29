import { Link } from "react-router-dom"

import { HERO } from "../../data/home"
import AuroraOrb from "../AuroraOrb"
import { DownloadIcon } from "../ui/icons"

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-12 pb-8 md:grid-cols-2 md:pt-16 md:pb-10">
      <div>
        <p className="text-accent mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
          {HERO.eyebrow}
        </p>

        <h1 className="text-fg text-4xl font-bold tracking-tight sm:text-5xl">
          {HERO.name}
          <span className="text-fg block">{HERO.role}</span>
          <span className="block bg-linear-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
            {HERO.highlight}
          </span>
        </h1>

        <p className="text-muted mt-6 max-w-md text-base leading-relaxed">
          {HERO.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={HERO.actions.primary.to}
            className="bg-accent text-accent-fg rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            {HERO.actions.primary.label}
          </Link>
          <a
            href={HERO.actions.secondary.href}
            className="border-line text-fg hover:bg-surface inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            {HERO.actions.secondary.label}
            <DownloadIcon className="size-4" />
          </a>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <AuroraOrb />
      </div>
    </section>
  )
}

export default Hero
