"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface ChatLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ChatLayout({ children, className }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>("zustand-flowchart-1")

  const handleNewCanvas = () => {
    console.log("Creating new canvas...")
    const newRoomId = `zustand-flowchart-${Date.now()}`
    setCurrentRoomId(newRoomId)
    // Add your new canvas logic here
  }

  const handleSelectCanvas = (roomId: string) => {
    console.log("Selecting canvas:", roomId)
    setCurrentRoomId(roomId)
    // Add your canvas selection logic here
  }

  return (
    <div className={cn("flex h-screen w-full", className)}>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-lg",
          "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm",
          "border border-gray-200 dark:border-gray-800",
          "shadow-lg hover:shadow-xl transition-all",
          "lg:hidden"
        )}
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40",
          "transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Sidebar
          onNewCanvas={handleNewCanvas}
          onSelectCanvas={handleSelectCanvas}
          currentRoomId={currentRoomId}
        />
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
