import { cn } from "../lib/utils"

function ContactInfo({ Icon, title, info, className }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="bg-accent/10 text-accent flex size-11 shrink-0 items-center justify-center rounded-full">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-fg text-sm font-semibold">{title}</p>
        <p className="text-muted text-sm break-words">{info}</p>
      </div>
    </div>
  )
}

export default ContactInfo
