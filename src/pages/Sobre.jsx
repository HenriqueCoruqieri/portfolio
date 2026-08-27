import StatCard from "../components/StatCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { BIO, HEADER, SERVICES, SERVICES_HEADING, STATS } from "../data/sobre"

function Sobre() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-2">
        <h1 className="text-fg text-4xl font-bold tracking-tight">
          {HEADER.title}
        </h1>
        <p className="text-muted mt-2">{HEADER.subtitle}</p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-8 md:grid-cols-2">
        <div className="text-muted space-y-5 leading-relaxed">
          {BIO.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-2xl bg-blue-600/30 blur-3xl"
            />
            <img
              src="/profile.png"
              alt="Henrique Coruqieri"
              className="aspect-4/5 w-full rounded-2xl object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-6 pb-16">
        <h2 className="text-fg mb-8 text-2xl font-bold tracking-tight">
          {SERVICES_HEADING}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

export default Sobre
