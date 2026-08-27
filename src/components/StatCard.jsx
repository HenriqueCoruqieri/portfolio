import { cn } from "../lib/utils"
import { Card } from "./ui/card"

function StatCard({ value, label, Icon, orientation = "vertical" }) {
  const isHorizontal = orientation === "horizontal"

  return (
    <Card
      className={cn(
        "gap-4 p-5",
        isHorizontal ? "flex-row items-center" : "items-start",
      )}
    >
      <span className="w-fit rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-fg text-2xl font-bold">{value}</p>
        <p className="text-muted text-sm">{label}</p>
      </div>
    </Card>
  )
}

export default StatCard
