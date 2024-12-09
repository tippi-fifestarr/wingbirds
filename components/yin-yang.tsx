"use client"

import { useTheme } from "next-themes"
import Link from "next/link"

export function YinYang() {
  const { theme } = useTheme()

  return (
    <Link href="/balance" aria-label="View balance details">
      <svg viewBox="0 0 100 100" className="w-8 h-8 transition-colors duration-300">
        <circle 
          cx="50" 
          cy="50" 
          r="49" 
          className={theme === "dark" ? "fill-white" : "fill-black"}
        />
        <path 
          d="M50,1 A49,49 0 0,1 50,99 A24.5,24.5 0 0,1 50,50 A24.5,24.5 0 0,0 50,1" 
          className={theme === "dark" ? "fill-black" : "fill-white"}
        />
        <circle 
          cx="50" 
          cy="26" 
          r="6" 
          className={theme === "dark" ? "fill-black" : "fill-white"}
        />
        <circle 
          cx="50" 
          cy="74" 
          r="6" 
          className={theme === "dark" ? "fill-white" : "fill-black"}
        />
      </svg>
    </Link>
  )
}

