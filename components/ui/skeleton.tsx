import { cn } from "@/libs/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-zinc-700 animate-pulse  rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
