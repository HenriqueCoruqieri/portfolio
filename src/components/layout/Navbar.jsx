import { NavLink } from "react-router-dom"

import { MoonIcon, SunIcon } from "../ui/icons"

const NAV_LINKS = [
  { label: "Sobre", to: "/sobre" },
  { label: "Projetos", to: "/projetos" },
  { label: "Skills", to: "/skills" },
  { label: "Experiência", to: "/experiencia" },
  { label: "Contato", to: "/contato" },
]

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="border-line bg-bg/80 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 items-center justify-between px-6">
        <NavLink to="/" className="text-fg text-xl font-bold tracking-tight">
          HC<span className="text-accent">.</span>
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`
                }
              >
                {link.label}
              </NavLink>
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
