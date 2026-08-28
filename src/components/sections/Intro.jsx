import { Link } from "react-router-dom"

import { STATS } from "../../data/about"
import { ABOUT } from "../../data/home"
import StatCard from "../StatCard"

function About() {
  return (
    <section
      id="sobre"
      className="border-line mx-auto max-w-6xl border-t px-6 py-16"
    >
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-fg text-3xl font-bold tracking-tight">
            {ABOUT.heading}
          </h2>
          <p className="text-muted mt-6 max-w-md leading-relaxed">
            {ABOUT.paragraph}
          </p>
          <Link
            to={ABOUT.cta.to}
            className="border-line text-fg hover:bg-surface mt-8 inline-flex rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            {ABOUT.cta.label}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} orientation="horizontal" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
