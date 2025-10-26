"use client"

import { memo, useState } from "react"
import { Handle, Position, NodeProps } from "reactflow"
import { Trash2, Edit2, Check, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import useStore from "@/lib/store"

function CustomNode({ id, data, selected, xPos, yPos }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data.label || "")
  const { updateNode, deleteNode, addNode } = useStore()

  const handleSave = () => {
    if (label.trim()) {
      updateNode(id, { label: label.trim() })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setLabel(data.label || "")
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("Delete this node?")) {
      deleteNode(id)
    }
  }

  const handleAddNode = () => {
    // Create new node to the right of current node
    const newNode = {
      type: "custom",
      position: { 
        x: (xPos || 0) + 200, 
        y: (yPos || 0) 
      },
      data: { label: "New Node" },
    }
    addNode(newNode)
  }

  return (
    <div
      className={cn(
        "relative px-4 py-3 rounded-lg border-2 bg-white dark:bg-slate-800 shadow-md min-w-[150px]",
        selected
          ? "border-[#ea9ab2] shadow-lg shadow-[#efcfe3]/50 dark:shadow-[#e27396]/30"
          : "border-gray-300 dark:border-gray-600"
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      {/* Add Node Button - Always visible on right side */}
      <button
        onClick={handleAddNode}
        className={cn(
          "absolute -right-3 top-1/2 -translate-y-1/2",
          "w-6 h-6 rounded-full",
          "bg-gradient-to-r from-[#eaf2d7] to-[#d4e8d0]",
          "hover:from-[#d4e8d0] hover:to-[#eaf2d7]",
          "text-gray-700 shadow-md hover:shadow-lg",
          "border border-gray-300 dark:border-gray-600",
          "transition-all duration-200",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-95",
          "z-10"
        )}
        title="Add connected node"
      >
        <Plus className="w-4 h-4" />
      </button>
      
      <div className="space-y-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") handleCancel()
              }}
              className="flex-1 px-2 py-1 text-sm border border-[#ea9ab2] rounded outline-none bg-white dark:bg-slate-700"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-1 hover:bg-green-100 dark:hover:bg-green-900 rounded"
            >
              <Check className="w-4 h-4 text-green-600" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {data.label}
            </span>
            {selected && (
              <div className="flex gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-[#efcfe3]/50 dark:hover:bg-[#ea9ab2]/30 rounded"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#ea9ab2] dark:text-[#efcfe3]" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export default memo(CustomNode)
