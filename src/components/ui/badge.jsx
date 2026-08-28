import { cn } from "../../lib/utils"

const BADGE_VARIANTS = {
  default: "bg-bg text-muted border-line",
  accent: "bg-accent/10 text-accent border-accent/25",
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-500",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        BADGE_VARIANTS[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
