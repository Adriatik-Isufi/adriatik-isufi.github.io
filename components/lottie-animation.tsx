"use client"

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface LottieAnimationProps {
  src: string
  width?: number
  height?: number
  speed?: number
}

export function LottieAnimation({ src, width = 300, height = 300, speed = 1 }: LottieAnimationProps) {
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
