"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Plus, FileText, MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react"

interface Canvas {
  id: string
  title: string
  roomId: string
  createdAt: Date
  updatedAt: Date
  nodeCount?: number
}

interface SidebarProps {
  className?: string
  onNewCanvas?: () => void
  onSelectCanvas?: (roomId: string) => void
  onRenameCanvas?: (canvasId: string, newTitle: string) => void
  onDeleteCanvas?: (canvasId: string) => void
  currentRoomId?: string
  canvases?: Canvas[]
}

export function Sidebar({ 
  className, 
  onNewCanvas, 
  onSelectCanvas,
  onRenameCanvas,
  onDeleteCanvas,
  currentRoomId,
  canvases = []
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Use real canvases data, no fallback to mock data
  const displayCanvases = canvases

  // Focus input when editing starts
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingId])

  const startEditing = (canvas: Canvas, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(canvas.id)
    setEditTitle(canvas.title)
  }

  const saveEdit = (canvasId: string) => {
    if (editTitle.trim() && editTitle !== displayCanvases.find(c => c.id === canvasId)?.title) {
      onRenameCanvas?.(canvasId, editTitle.trim())
    }
    setEditingId(null)
    setEditTitle("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
  }

  const handleDelete = (canvasId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this canvas?")) {
      onDeleteCanvas?.(canvasId)
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full w-64 border-r border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-slate-900",
        className
      )}
    >
      {/* Header with New Canvas Button */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50">
        <button
          onClick={() => {
            console.log('New Canvas button clicked');
            onNewCanvas?.();
          }}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg",
            "bg-gradient-to-r from-[#eaf2d7] to-[#d4e8d0] hover:from-[#d4e8d0] hover:to-[#eaf2d7]",
            "text-gray-700 font-medium text-sm",
            "transition-all duration-200 shadow-sm hover:shadow-md",
            "active:scale-[0.98]"
          )}
        >
          <Plus className="w-4 h-4" />
          New Canvas
        </button>
      </div>

      {/* Canvas History */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Your Canvases
          </div>
          {displayCanvases.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                No saved canvases yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Click "New Canvas" to get started
              </p>
            </div>
          ) : (
            displayCanvases.map((canvas) => {
            const isEditing = editingId === canvas.id
            
            return (
              <div
                key={canvas.id}
                className={cn(
                  "w-full group relative flex flex-col gap-1 px-3 py-2.5 rounded-lg",
                  "transition-all duration-200",
                  currentRoomId === canvas.roomId
                  ? "bg-[#efcfe3]/30 dark:bg-[#e27396]/20 text-[#e27396] dark:text-[#ea9ab2]"
                  : "hover:bg-gray-100/80 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div 
                    className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                    onClick={() => !isEditing && onSelectCanvas?.(canvas.roomId)}
                  >
                    <FileText className="w-4 h-4 flex-shrink-0 opacity-60" />
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(canvas.id)
                          if (e.key === "Escape") cancelEdit()
                        }}
                        className={cn(
                          "flex-1 text-sm font-medium bg-white dark:bg-slate-800",
                          "border border-blue-500 rounded px-1 py-0.5 outline-none"
                        )}
                      />
                    ) : (
                      <span className="text-sm font-medium truncate">
                        {canvas.title}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(canvas.id)}
                          className="p-1 hover:bg-green-200 dark:hover:bg-green-700 rounded"
                        >
                          <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 hover:bg-red-200 dark:hover:bg-red-700 rounded"
                        >
                          <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => startEditing(canvas, e)}
                          className={cn(
                            "opacity-0 group-hover:opacity-100 transition-opacity",
                            "p-1 hover:bg-blue-200 dark:hover:bg-blue-700 rounded"
                          )}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(canvas.id, e)}
                          className={cn(
                            "opacity-0 group-hover:opacity-100 transition-opacity",
                            "p-1 hover:bg-red-200 dark:hover:bg-red-700 rounded"
                          )}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {!isEditing && canvas.nodeCount !== undefined && (
                  <p className="text-xs opacity-60 truncate pl-6">
                    {canvas.nodeCount} nodes
                  </p>
                )}
                {!isEditing && (
                  <span className="text-xs opacity-50 pl-6">
                    {formatTimestamp(canvas.updatedAt)}
                  </span>
                )}
              </div>
            )
          })
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {displayCanvases.length} canvases
        </div>
      </div>
    </div>
  )
}
