import { useNavigate } from "react-router-dom"

import { SOCIAL_LINKS } from "../../data/footer"

function Footer() {
  const navigate = useNavigate()

  function handleNavigate({ href, external }) {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }

    navigate(href)
  }

  return (
    <footer id="contato" className="border-line border-t">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <p className="text-muted text-sm">
          © 2026 Henrique Coruqieri. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, external, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavigate({ href, external })}
              aria-label={label}
              className="text-muted hover:text-fg hover:border-line rounded-lg border border-transparent p-2 transition-colors"
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
