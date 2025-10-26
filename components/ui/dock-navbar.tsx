"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/components/ui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockNavbar() {
  const pathname = usePathname();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <>
      {/* Tooltip */}
      {hoveredIcon && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 
                        bg-white dark:bg-gray-800
                        text-gray-800 dark:text-gray-200 text-xs font-bold tracking-wider uppercase
                        rounded-lg shadow-lg
                        animate-in fade-in slide-in-from-bottom-1 duration-150">
          {hoveredIcon}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 
                          bg-white dark:bg-gray-800" />
        </div>
      )}

      <Dock 
        direction="middle" 
        iconSize={35}
        iconMagnification={50} 
        iconDistance={80}
        className="backdrop-blur-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40
                   dark:bg-gradient-to-br dark:from-gray-800/80 dark:via-gray-900/60 dark:to-gray-950/40
                   shadow-2xl shadow-blue-500/20 dark:shadow-blue-400/10
                   rounded-3xl px-4 py-2
                   ring-1 ring-white/50 dark:ring-gray-700/50
                   relative overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent before:pointer-events-none"
      >
        <DockIcon 
          className="bg-gradient-to-br from-[#b3dee2]/30 to-transparent 
                     hover:from-[#b3dee2]/50 hover:to-[#a8d5e2]/30
                     dark:from-[#b3dee2]/20 dark:to-transparent 
                     dark:hover:from-[#b3dee2]/30 dark:hover:to-[#a8d5e2]/20
                     rounded-2xl transition-all duration-300 
                     hover:scale-110 active:scale-95"
          onMouseEnter={() => setHoveredIcon("Home")} 
          onMouseLeave={() => setHoveredIcon(null)}
          onClick={() => window.location.href = "/"}
        >
          <Icons.home className="size-full text-[#7ec8d6] dark:text-[#b3dee2] 
                                 drop-shadow-sm" />
        </DockIcon>
        
        <DockIcon 
          className="bg-gradient-to-br from-[#b3dee2]/30 to-transparent 
                     hover:from-[#b3dee2]/50 hover:to-[#a8d5e2]/30
                     dark:from-[#b3dee2]/20 dark:to-transparent 
                     dark:hover:from-[#b3dee2]/30 dark:hover:to-[#a8d5e2]/20
                     rounded-2xl transition-all duration-300 
                     hover:scale-110 active:scale-95"
          onMouseEnter={() => setHoveredIcon("Graph")} 
          onMouseLeave={() => setHoveredIcon(null)}
          onClick={() => window.location.href = "/graph"}
        >
          <Icons.network className="size-full text-[#7ec8d6] dark:text-[#b3dee2] 
                                    drop-shadow-sm" />
        </DockIcon>
      </Dock>
    </>
  );
}

const Icons = {
  home: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  network: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="2"></circle>
      <circle cx="19" cy="5" r="2"></circle>
      <circle cx="5" cy="5" r="2"></circle>
      <circle cx="19" cy="19" r="2"></circle>
      <circle cx="5" cy="19" r="2"></circle>
      <line x1="12" y1="14" x2="5" y2="17"></line>
      <line x1="12" y1="14" x2="19" y2="17"></line>
      <line x1="12" y1="10" x2="5" y2="7"></line>
      <line x1="12" y1="10" x2="19" y2="7"></line>
    </svg>
  ),
  moon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  sun: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
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
  ),
};

export default DockNavbar;
