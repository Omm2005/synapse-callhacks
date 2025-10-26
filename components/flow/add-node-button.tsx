"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddNodeButtonProps {
  onClick: () => void
  className?: string
}

export function AddNodeButton({ onClick, className }: AddNodeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed top-20 right-6 z-50",
        "w-12 h-12 rounded-full",
        "bg-gradient-to-r from-[#ea9ab2] to-[#e27396]",
        "hover:from-[#e27396] hover:to-[#ea9ab2]",
        "text-white shadow-lg hover:shadow-xl",
        "transition-all duration-200",
        "active:scale-95",
        "flex items-center justify-center",
        "group",
        className
      )}
      title="Add Node"
    >
      <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
    </button>
  )
}
