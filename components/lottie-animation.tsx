"use client"

import { useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { CheckCircle, Car } from "lucide-react"

interface LottieAnimationProps {
  src: string
  width?: number
  height?: number
  speed?: number
}

export function LottieAnimation({ src, width = 300, height = 300, speed = 1 }: LottieAnimationProps) {
  const [showFallback, setShowFallback] = useState(false)

  // Fallback CSS Animation Component
  const FallbackAnimation = () => (
    <div className="relative">
      {/* Main circle with animated elements */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative overflow-hidden">
        {/* Animated checkmark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
          </div>
        </div>

        {/* Orbiting elements */}
        <div className="absolute inset-0">
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#1351d8] rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            <Car className="h-4 w-4 text-white" />
          </div>
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#1351d8]/60 rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
      </div>

      {/* Floating elements around the circle */}
      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#1351d8] rounded-full animate-pulse"></div>
      <div
        className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )

  if (showFallback) {
    return <FallbackAnimation />
  }

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <DotLottieReact
        src={src}
        loop
        autoplay
        speed={speed}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
