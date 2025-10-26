'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/providers/theme-provider'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-6 py-3 rounded-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 via-purple-700/20 to-blue-700/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-blue-600/30 border border-white/20 dark:border-white/10 shadow-lg">
        {/* Home Link */}
        <Link
          href="/"
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 ${
            pathname === '/'
              ? 'bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/5'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>HOME</span>
        </Link>

        {/* Content/Graph Link */}
        <Link
          href="/graph"
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200 ${
            pathname === '/graph'
              ? 'bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/5'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
            <path d="M3 12A9 3 0 0 0 21 12"></path>
          </svg>
          <span>GRAPH</span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/5 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-300"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-300"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
