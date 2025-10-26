"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyCanvasProps {
  onCreateNode: () => void
}

export function EmptyCanvas({ onCreateNode }: EmptyCanvasProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center space-y-4 pointer-events-auto">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#efcfe3] to-[#ea9ab2] dark:from-[#e27396]/30 dark:to-[#ea9ab2]/30 flex items-center justify-center">
          <Plus className="w-10 h-10 text-[#e27396] dark:text-[#efcfe3]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Empty Canvas
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Start building your flowchart
          </p>
        </div>
        <button
          onClick={onCreateNode}
          className={cn(
            "px-6 py-3 rounded-lg font-medium",
            "bg-gradient-to-r from-[#ea9ab2] to-[#e27396]",
            "hover:from-[#e27396] hover:to-[#ea9ab2]",
            "text-white shadow-lg hover:shadow-xl",
            "transition-all duration-200",
            "active:scale-95"
          )}
        >
          Create Your First Node
        </button>
      </div>
    </div>
  )
}
