import { cn } from "../../lib/utils"

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "border-line bg-surface text-fg placeholder:text-muted focus-visible:border-accent w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
