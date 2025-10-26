'use client'

import React from 'react'
import { DockNavbar } from '@/components/ui/dock-navbar'

export default function GraphPage() {
  return (
    <>
      <DockNavbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Graph Page</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your graph visualization will go here
          </p>
        </div>
      </div>
    </>
  )
}
