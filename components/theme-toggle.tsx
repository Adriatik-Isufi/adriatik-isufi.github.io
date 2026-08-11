"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { getResolvedTheme, toggleTheme, type Theme } from "@/lib/theme"

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getResolvedTheme())
    setMounted(true)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      // Only track system changes when user has not forced a preference.
      try {
        if (!localStorage.getItem("theme")) {
          setTheme(getResolvedTheme())
        }
      } catch {
        setTheme(getResolvedTheme())
      }
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const handleToggle = () => {
    setTheme(toggleTheme())
  }

  const isDark = theme === "dark"
  const label = isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors hover:text-[#1351d8] dark:text-slate-200 dark:hover:text-[#1351d8] ${className}`}
    >
      {/* Avoid icon flash before client hydration resolves theme */}
      {mounted ? (
        isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
