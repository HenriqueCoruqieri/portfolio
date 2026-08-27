import { GithubIcon, LinkedinIcon, MailIcon } from "../ui/icons"

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "E-mail", href: "mailto:heoliveirac@gmail.com", Icon: MailIcon },
]

function Footer() {
  return (
    <footer id="contato" className="border-line border-t">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <p className="text-muted text-sm">
          © 2026 Henrique Coruqieri. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted hover:text-fg hover:border-line rounded-lg border border-transparent p-2 transition-colors"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
