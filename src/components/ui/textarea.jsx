import { cn } from "../../lib/utils"

function Textarea({ className, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "border-line bg-surface text-fg placeholder:text-muted focus-visible:border-accent w-full resize-y rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
