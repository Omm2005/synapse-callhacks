"use client"
import { cn } from "@/lib/utils"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 h-full w-full pointer-events-none
      bg-gradient-to-br from-[#88bcde] via-[#e5e9eb] to-[#0c447c]"
      style={{ zIndex: 0 }}>
      <InteractiveGridPattern
        className={cn(
          "absolute inset-0 h-full w-full mask-[radial-gradient(ellipse_at_center,white_20%,rgba(255,255,255,0.4)_70%,transparent)] pointer-events-none"
        )}
        width={40}
        height={40}
        hoverColor="rgb(59, 130, 246)"
      />
    </div>
  )
}