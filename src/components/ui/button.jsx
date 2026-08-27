import { cn } from "../../lib/utils"

function Button({ className, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "bg-accent text-accent-fg inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Button }
