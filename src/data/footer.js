import { GithubIcon, LinkedinIcon, MailIcon } from "../components/ui/icons"

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    field: "githubUrl",
    external: true,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    field: "linkedinUrl",
    external: true,
    Icon: LinkedinIcon,
  },
  {
    label: "E-mail",
    href: "/contato",
    external: false,
    Icon: MailIcon,
  },
]
