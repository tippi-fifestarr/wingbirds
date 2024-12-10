"use client"

import { Mail, Twitter, Github } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { MeetingScheduler } from './meeting-scheduler'

const skills = [
  "Full Stack",
  "Web3",
  "Community",
  "Hackathons",
  "Technical Writing",
]

export function BusinessCard() {
  const { theme, setTheme } = useTheme()
  const myAptosAddress = "0xTippiFifestarr"
  
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <div className="relative w-96 aspect-[1.618/1] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Language Toggle */}
        <button 
          className="absolute top-4 right-4 flex items-center gap-2 text-sm opacity-75 hover:opacity-100 transition-opacity"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="font-noto-sans">{theme === "dark" ? "中文" : "EN"}</span>
        </button>

        {/* Card Content */}
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tippi Fifestarr
            </h1>
            <p className="text-sm mb-4 text-gray-300">
              Founder - Wingbird Enterprises LLC
            </p>
            <div className="flex items-center gap-2 text-sm mb-6 text-gray-300">
              <Mail className="h-4 w-4" />
              <span>tippi@wingbirds.com</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  "text-xs px-3 py-1 rounded-full",
                  "bg-gradient-to-r from-gray-800 to-gray-700",
                  "border border-gray-700",
                  "hover:scale-105 transition-transform cursor-pointer",
                  "hover:border-gray-600"
                )}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <Twitter className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform text-gray-300 hover:text-white" />
            <Github className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform text-gray-300 hover:text-white" />
          </div>
        </div>
      </div>
      <MeetingScheduler recipientAddress={myAptosAddress} />
    </div>
  )
}

