import { cn } from "../../lib/utils"
import { SearchIcon } from "./icons"
import { Input } from "./input"

function SearchInput({
  value,
  onValueChange,
  className,
  clearLabel = "Limpar busca",
  ...props
}) {
  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        aria-hidden="true"
        className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
      />

      <Input
        type="text"
        {...props}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="px-9"
      />

      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label={clearLabel}
          className="text-muted hover:text-fg absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-lg leading-none transition-colors"
        >
          ×
        </button>
      )}
    </div>
  )
}

export { SearchInput }
