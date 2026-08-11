export type Theme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // localStorage unavailable (private mode / SSR)
  }
  return null
}

export function prefersDarkScheme(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/** Resolve whether dark mode should be active from storage or system preference. */
export function resolveDark(stored: Theme | null = getStoredTheme()): boolean {
  if (stored === "dark") return true
  if (stored === "light") return false
  return prefersDarkScheme()
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // ignore write failures
  }
}

/** Toggle between light and dark based on the current resolved appearance. */
export function toggleTheme(): Theme {
  const next: Theme = resolveDark() ? "light" : "dark"
  applyTheme(next)
  return next
}

export function getResolvedTheme(): Theme {
  return resolveDark() ? "dark" : "light"
}
