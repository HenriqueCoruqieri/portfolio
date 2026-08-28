import { cn } from "../../lib/utils"

function Select({ className, ...props }) {
  return (
    <select
      className={cn(
        "border-line bg-surface text-fg focus-visible:border-accent w-full rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none",
        className,
      )}
      {...props}
    />
  )
}

export { Select }
