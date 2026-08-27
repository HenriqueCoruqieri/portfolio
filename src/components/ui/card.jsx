import { cn } from "../../lib/utils"

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface border-line text-fg flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-1.5 px-6", className)} {...props} />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-fg leading-snug font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-muted text-sm leading-relaxed", className)} {...props} />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center px-6", className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
