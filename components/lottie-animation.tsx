"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Loaded on demand: the dotlottie player pulls a ~540 KB WASM engine plus the
// animation file, so neither belongs in the initial page load.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
)

interface LottieAnimationProps {
  src: string
  width?: number
  height?: number
  speed?: number
}

export function LottieAnimation({ src, width = 300, height = 300, speed = 1 }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Only mount the player once the animation scrolls near the viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px` }}>
      {shouldLoad && (
        <DotLottieReact
          src={src}
          loop
          autoplay
          speed={speed}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}
