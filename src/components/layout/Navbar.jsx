import { MoonIcon, SunIcon } from "../ui/icons"

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Skills", href: "#skills" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
]

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="border-line bg-bg/80 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-fg text-xl font-bold tracking-tight">
          HC<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-fg text-sm transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Alternar tema"
          className="text-muted hover:text-fg hover:border-line rounded-lg border border-transparent p-2 transition-colors"
        >
          {theme === "dark" ? (
            <SunIcon className="size-5" />
          ) : (
            <MoonIcon className="size-5" />
          )}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
