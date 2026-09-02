import {
  BriefcaseIcon,
  CheckCircleIcon,
  HeartIcon,
  NextIcon,
  NodeIcon,
  PostgresIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "../components/ui/icons"

export const HERO = {
  eyebrow: "Olá, meu nome é",
  name: "Henrique Coruqieri",
  role: "Desenvolvedor",
  highlight: "Full Stack",
  description:
    "Desenvolvo aplicações web modernas, de alta performance e com foco na melhor experiência do usuário.",
  actions: {
    primary: { label: "Ver projetos", to: "/projetos" },
    secondary: {
      label: "Baixar currículo",
      href: "/curriculo.pdf",
      download: "Curriculo-Henrique-Coruqieri.pdf",
    },
  },
}

export const TECHNOLOGIES = [
  { name: "Next.js", Icon: NextIcon },
  { name: "React", Icon: ReactIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "TailwindCSS", Icon: TailwindIcon },
  { name: "Node.js", Icon: NodeIcon },
  { name: "PostgreSQL", Icon: PostgresIcon },
]

export const HOME_STATS = [
  { value: "+3", label: "Anos de experiência", Icon: BriefcaseIcon },
  { value: "+15", label: "Clientes satisfeitos", Icon: HeartIcon },
  { value: "+20", label: "Projetos concluídos", Icon: CheckCircleIcon },
]

export const ABOUT = {
  heading: "Sobre mim",
  cta: { label: "Saiba mais sobre mim", to: "/sobre" },
}
