"use client"

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"

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

export const InteractiveYinYang = () => {
  const [hoveredSide, setHoveredSide] = useState<'tech' | 'creative' | null>(null)
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <div className="max-w-6xl mx-auto relative">
      <h1 className="text-3xl md:text-4xl mb-8 text-center font-playfair">Tippi Fifestarr / Sasha Letchinger</h1>
      
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="relative w-full max-w-lg aspect-square">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <clipPath id="yinPath">
                <path d="M50,0 A50,50 0 0,1 50,100 A25,25 0 0,1 50,50 A25,25 0 0,0 50,0" />
              </clipPath>
            </defs>
            
            <circle cx="50" cy="50" r="49.5" className={`${isDark ? 'fill-white stroke-white' : 'fill-black stroke-black'}`} strokeWidth="1"/>
            
            <path 
              d="M50,0 A50,50 0 0,1 50,100 A25,25 0 0,1 50,50 A25,25 0 0,0 50,0" 
              className={`transition-all duration-300 ${isDark ? 'fill-black' : 'fill-white'}`}
              style={{
                opacity: hoveredSide === 'tech' ? (isDark ? 0.7 : 0.3) : 1
              }}
            />
            
            <circle cx="50" cy="25" r="6" className={isDark ? 'fill-black' : 'fill-white'}/>
            <circle cx="50" cy="75" r="6" className={isDark ? 'fill-white' : 'fill-black'}/>
          </svg>

          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full" onMouseEnter={() => setHoveredSide('tech')} onMouseLeave={() => setHoveredSide(null)} />
            <div className="w-1/2 h-full" onMouseEnter={() => setHoveredSide('creative')} onMouseLeave={() => setHoveredSide(null)} />
          </div>
        </div>

        {/* Technical Pursuits Overlay */}
        <Card className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 bg-background/80 backdrop-blur-sm p-4 transition-opacity duration-300 overflow-y-auto max-h-full" style={{ opacity: hoveredSide === 'tech' ? 1 : 0, pointerEvents: hoveredSide === 'tech' ? 'auto' : 'none' }}>
          <h2 className="text-2xl font-bold mb-4">Technical Pursuits</h2>
          {Object.entries(details.tech).map(([title, desc]) => (
            <TooltipProvider key={title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-4 p-2 rounded-md transition-colors hover:bg-primary/10">
                    <h3 className="font-bold">{title}</h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{desc}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </Card>

        {/* Creative Pursuits Overlay */}
        <Card className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 bg-background/80 backdrop-blur-sm p-4 transition-opacity duration-300 overflow-y-auto max-h-full" style={{ opacity: hoveredSide === 'creative' ? 1 : 0, pointerEvents: hoveredSide === 'creative' ? 'auto' : 'none' }}>
          <h2 className="text-2xl font-bold mb-4">Creative Pursuits</h2>
          {Object.entries(details.creative).map(([title, desc]) => (
            <TooltipProvider key={title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mb-4 p-2 rounded-md transition-colors hover:bg-primary/10">
                    <h3 className="font-bold">{title}</h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{desc}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Hover over each side of the Yin-Yang to explore the duality of technical and creative pursuits
      </div>
    </div>
  )
}

