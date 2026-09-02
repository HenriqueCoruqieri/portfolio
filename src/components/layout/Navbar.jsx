import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

import { cn } from "../../lib/utils"
import { ChevronDownIcon, MoonIcon, SunIcon } from "../ui/icons"

const NAV_LINKS = [
  { label: "Sobre", to: "/sobre" },
  { label: "Projetos", to: "/projetos" },
  { label: "Skills", to: "/skills" },
  { label: "Experiência", to: "/experiencia" },
  { label: "Contato", to: "/contato" },
]

const MOBILE_MENU_ID = "mobile-nav-menu"

function Navbar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    function handlePopState() {
      setIsMenuOpen(false)
    }

    document.addEventListener("pointerdown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isMenuOpen])

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

        <div className="flex items-center gap-2">
          <div className="relative md:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-expanded={isMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              className="text-muted hover:text-fg hover:border-line focus-visible:ring-accent flex items-center gap-1 rounded-lg border border-transparent p-2 text-sm transition-colors outline-none focus-visible:ring-2"
            >
              Navegar
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform",
                  isMenuOpen && "rotate-180",
                )}
              />
            </button>

            {isMenuOpen && (
              <ul
                id={MOBILE_MENU_ID}
                className="bg-surface border-line absolute top-full right-0 mt-2 flex w-44 flex-col gap-1 rounded-lg border p-2 shadow-lg"
              >
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "focus-visible:ring-accent block rounded-md px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2",
                          isActive ? "text-fg" : "text-muted hover:text-fg",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
        </div>
      </nav>
    </header>
  )
}

export default Navbar
