/**
 * Announcement Popup configuration.
 *
 * To run a new promotion / campaign / holiday offer / event:
 *   1. Drop the image into `public/announcements/` (e.g. `public/announcements/summer-2026.webp`).
 *   2. Add (or edit) an entry in the `announcements` array below.
 *   3. Set `enabled: true`.
 *   4. Fill in title, description, button text/link and optional start/end dates.
 *
 * No component / React code needs to change — ever. Only this file + the image.
 *
 * The popup shows the FIRST announcement that is currently active
 * (enabled === true AND inside its optional start/end date window).
 * Keep multiple entries here as history; only the active one is displayed.
 */

export interface Announcement {
  /** Stable unique id. Used as the localStorage key for `showOnce`. Change it to re-show a campaign. */
  id: string
  /** Master switch. If false, this announcement never appears. */
  enabled: boolean
  /** Optional heading rendered below the image. Omit/empty for an image-only popup. */
  title?: string
  /** Optional body text rendered below the title. */
  description?: string
  /** Image path relative to /public, e.g. "/announcements/summer-2026.webp". */
  image: string
  /** Alt text for the image (accessibility / SEO). */
  imageAlt?: string
  /** Optional call-to-action button label. Button only renders when both this and buttonLink are set. */
  buttonText?: string
  /** Button target. A route ("/angebote"), an anchor ("#contact"), or a full URL. */
  buttonLink?: string
  /** Show only once per visitor (persisted in localStorage). */
  showOnce?: boolean
  /** ISO date (e.g. "2026-06-01") to start showing. null/omit = no start limit. */
  startDate?: string | null
  /** ISO date (e.g. "2026-06-30") to stop showing. null/omit = no end limit. */
  endDate?: string | null
}

export const announcements: Announcement[] = [
  {
    id: "vku-june-2026",
    enabled: false,
    image: "/announcements/VKU-24-25-June-2026.webp",
    imageAlt: "VKU Veranstaltung - 24. & 25. Juni 2026 - Sicher im Straßenverkehr",
    showOnce: false,
    startDate: null,
    endDate: null,
  },
]

/** Returns the first announcement that is currently active, or null if none. */
export function getActiveAnnouncement(now: Date = new Date()): Announcement | null {
  return (
    announcements.find((a) => {
      if (!a.enabled) return false
      if (a.startDate && now < new Date(a.startDate)) return false
      if (a.endDate && now > new Date(a.endDate)) return false
      return true
    }) ?? null
  )
}
