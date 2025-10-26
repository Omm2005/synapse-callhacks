"use client"

import { ChatLayout } from "@/components/ui/chat-layout"

export default function ChatPage() {
  return (
    <ChatLayout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Welcome to Synapse
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a chat from the sidebar or create a new one
          </p>
        </div>
      </div>
    </ChatLayout>
  )
}
