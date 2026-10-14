"use client"

import { useEffect, useRef } from "react"

interface CountUpProps {
  to: number
  suffix?: string
  duration?: number
}

// Counts from 0 up to `to` once the number is on screen, easing out like a battery
// charging up. The static HTML already holds the final value (SEO, no-JS); globals.css
// keeps it hidden until this effect resets it to 0, so it never visibly jumps back.
export function CountUp({ to, suffix = "", duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = (n: number) => {
      el.textContent = `${n}${suffix}`
    }

    el.dataset.countReady = ""
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    show(0)
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          show(Math.round((1 - Math.pow(1 - t, 3)) * to))
          if (t < 1) {
            frame = requestAnimationFrame(tick)
          } else {
            el.classList.add("count-up-done")
          }
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, suffix, duration])

  return (
    <span ref={ref} data-count-up className="inline-block tabular-nums">
      {`${to}${suffix}`}
    </span>
  )
}
