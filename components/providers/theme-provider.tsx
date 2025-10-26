'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'synapse-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [storageKey])

  useEffect(() => {
    console.log('Theme changed to:', theme)
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    console.log('Applied class to html:', theme, 'Classes:', root.classList.toString())
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggleTheme = () => {
    console.log('toggleTheme called, current theme:', theme)
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('Setting theme to:', newTheme)
      return newTheme
    })
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
