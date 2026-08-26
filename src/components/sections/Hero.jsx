import { DownloadIcon } from "../ui/icons"

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-12 pb-8 md:grid-cols-2 md:pt-16 md:pb-10">
      <div>
        <p className="text-accent mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
          Olá, meu nome é
        </p>

        <h1 className="text-fg text-4xl font-bold tracking-tight sm:text-5xl">
          Henrique Coruqieri
          <span className="text-fg block">Desenvolvedor</span>
          <span className="block bg-linear-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
            Full Stack
          </span>
        </h1>

        <p className="text-muted mt-6 max-w-md text-base leading-relaxed">
          Desenvolvo aplicações web modernas, rápidas e com foco na melhor
          experiência do usuário.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projetos"
            className="bg-accent text-accent-fg rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            Ver projetos
          </a>
          <a
            href="/curriculo.pdf"
            className="border-line text-fg hover:bg-surface inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            Baixar currículo
            <DownloadIcon className="size-4" />
          </a>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-2xl bg-blue-600/30 blur-3xl"
          />
          <img
            src="/profile.png"
            alt="Henrique Coruqieri"
            className="w-80 object-cover sm:w-96 lg:w-104"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 82% at 50% 42%, #000 55%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 78% 82% at 50% 42%, #000 55%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
