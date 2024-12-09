"use client"

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from "@/lib/utils"

const details = {
  tech: {
    'Developer Relations': 'Building bridges between communities and technology through events like Cyberjam',
    'Hackathon Organizer': 'Created and led successful hackathons bridging creative and technical communities',
    'Technical Writer': 'Transforming complex concepts into clear, engaging documentation'
  },
  creative: {
    'Musical Nomad': 'Traveled with backpack, banjo, and Ableton, teaching and DJing in China',
    'Conceptual Artist': 'Creating meaningful transitions - like the upcoming hair donation project combining art, technology, and philanthropy',
    'Bilingual (中文)': 'Bridging East and West through language and cultural understanding'
  }
}

export default function BalancePage() {
  const [hoveredSide, setHoveredSide] = useState<'tech' | 'creative' | null>(null)
  const { theme } = useTheme()

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl mb-8 text-center font-playfair">Tippi Fifestarr / Sasha Letchinger</h1>
      
      <div className="relative w-full max-w-lg aspect-square mx-auto mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="49" 
            className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "fill-white" : "fill-black"
            )}
          />
          <path 
            d="M50,1 A49,49 0 0,1 50,99 A24.5,24.5 0 0,1 50,50 A24.5,24.5 0 0,0 50,1" 
            className={cn(
              "transition-all duration-300",
              theme === "dark" ? "fill-black" : "fill-white",
              hoveredSide === 'creative' ? "opacity-70" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredSide('tech')}
            onMouseLeave={() => setHoveredSide(null)}
          />
          <path 
            d="M50,1 A49,49 0 0,0 50,99 A24.5,24.5 0 0,0 50,50 A24.5,24.5 0 0,1 50,1" 
            className={cn(
              "transition-all duration-300",
              theme === "dark" ? "fill-white" : "fill-black",
              hoveredSide === 'tech' ? "opacity-70" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredSide('creative')}
            onMouseLeave={() => setHoveredSide(null)}
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
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Technical Pursuits</h2>
          {Object.entries(details.tech).map(([title, desc]) => (
            <div key={title} className="mb-4">
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Creative Pursuits</h2>
          {Object.entries(details.creative).map(([title, desc]) => (
            <div key={title} className="mb-4">
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Hover over each side of the Yin-Yang to explore the duality of technical and creative pursuits
      </div>
    </div>
  )
}

