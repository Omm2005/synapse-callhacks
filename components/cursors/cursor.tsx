"use client";

import { memo } from "react";

type CursorProps = {
  x: number;
  y: number;
  name: string;
  avatar?: string;
  color: string;
};

const COLORS = [
  "#DC2626", // red
  "#EA580C", // orange
  "#D97706", // amber
  "#65A30D", // lime
  "#059669", // emerald
  "#0891B2", // cyan
  "#2563EB", // blue
  "#7C3AED", // violet
  "#C026D3", // fuchsia
  "#DB2777", // pink
];

export const Cursor = memo(function Cursor({ x, y, name, avatar, color }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-50 will-change-transform"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.12s cubic-bezier(0.17, 0.67, 0.5, 0.96)',
      }}
    >
      {/* Cursor SVG - cleaner design */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.3))' }}
      >
        <path
          d="M3.5 1L13.5 11L8.5 12.5L5.5 17L3.5 16L6.5 11.5L3.5 8V1Z"
          fill={color}
          stroke="white"
          strokeWidth="1"
        />
      </svg>

      {/* Name tag - improved design */}
      <div
        className="ml-4 -mt-1 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white shadow-lg"
        style={{ backgroundColor: color }}
      >
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="h-4 w-4 rounded-full border border-white/30"
          />
        )}
        <span className="whitespace-nowrap font-semibold">{name}</span>
      </div>
    </div>
  );
});

// Generate consistent color for each user
export function getColorForUser(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
