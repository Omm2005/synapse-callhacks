"use client"
import React, { useEffect, useId, useRef, useState } from "react"

interface InteractiveGridPatternProps {
  width?: number
  height?: number
  squares?: [number, number]
  className?: string
  squaresClassName?: string
  hoverColor?: string
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares,
  className,
  squaresClassName,
  hoverColor = "rgb(59, 130, 246)",
}: InteractiveGridPatternProps) {
  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ horizontal: 30, vertical: 30 })
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)

  useEffect(() => {
    if (squares) {
      setDimensions({ horizontal: squares[0], vertical: squares[1] })
    } else {
      const updateDimensions = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const horizontal = Math.ceil(rect.width / width)
          const vertical = Math.ceil(rect.height / height)
          setDimensions({ horizontal, vertical })
        }
      }
      updateDimensions()
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [squares, width, height])

  const handleMouseEnter = (i: number) => {
    setHoveredSquare(i)
  }

  const handleMouseLeave = () => {
    setHoveredSquare(null)
  }

  return (
    <div ref={containerRef} className={className}>
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={`grid-pattern-${id}`}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#ea9ab2]/50 dark:text-[#efcfe3]/40"
              strokeLinecap="round"
            />
          </pattern>
          {/* Add accent lines every 5th grid line */}
          <pattern
            id={`grid-accent-${id}`}
            width={width * 5}
            height={height * 5}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${width * 5} 0 L 0 0 0 ${height * 5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#e27396]/60 dark:text-[#ea9ab2]/50"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${id})`} />
        <rect width="100%" height="100%" fill={`url(#grid-accent-${id})`} />
        {Array.from({ length: dimensions.horizontal * dimensions.vertical }).map((_, i) => {
          const x = (i % dimensions.horizontal) * width
          const y = Math.floor(i / dimensions.horizontal) * height
          const isHovered = hoveredSquare === i
          
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={width}
              height={height}
              fill={isHovered ? hoverColor : "transparent"}
              opacity={isHovered ? 0.4 : 0}
              className="transition-opacity duration-200"
              onPointerEnter={() => handleMouseEnter(i)}
              onPointerLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
            />
          )
        })}
      </svg>
    </div>
  )
}