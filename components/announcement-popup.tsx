"use client"

import { useState, useEffect } from "react"
import { X, Megaphone } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getActiveAnnouncement } from "@/config/announcements"

/**
 * Generic, data-driven announcement popup.
 *
 * Renders the currently active announcement from `config/announcements.ts`.
 * No code changes are needed for a new campaign — only edit the config + drop
 * an image into `public/announcements/`. If nothing is active, renders nothing.
 */
export function AnnouncementPopup() {
  const announcement = getActiveAnnouncement()

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  // Hidden permanently once a `showOnce` announcement has been seen on this device.
  const [dismissed, setDismissed] = useState(false)

  const storageKey = announcement ? `announcement_seen_${announcement.id}` : null

  useEffect(() => {
    if (!announcement) return

    // Respect "show once per visitor" via localStorage.
    if (announcement.showOnce && storageKey) {
      try {
        if (localStorage.getItem(storageKey)) {
          setDismissed(true)
          return
        }
      } catch {
        // localStorage unavailable (e.g. privacy mode) — fall through and just show it.
      }
    }

    const timer = setTimeout(() => setIsOpen(true), 1500)
    return () => clearTimeout(timer)
  }, [announcement, storageKey])

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(true)

    if (announcement?.showOnce && storageKey) {
      try {
        localStorage.setItem(storageKey, "1")
      } catch {
        // ignore write failures
      }
    }
  }

  const handleReopen = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  const handleButtonClick = () => {
    handleClose()

    const link = announcement?.buttonLink
    if (!link) return

    // In-page anchor → smooth scroll. Everything else → normal navigation.
    if (link.startsWith("#")) {
      const target = document.getElementById(link.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    window.location.href = link
  }

  if (!announcement || dismissed) return null
  if (!isOpen && !isMinimized) return null

  const hasContent = Boolean(announcement.title || announcement.description)
  const hasButton = Boolean(announcement.buttonText && announcement.buttonLink)

  return (
    <>
      {/* Floating button to reopen after minimizing */}
      {isMinimized && !isOpen && (
        <button
          onClick={handleReopen}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group animate-slow-bounce hover:animate-none"
          aria-label={announcement.title ? `${announcement.title} anzeigen` : "Aktion anzeigen"}
        >
          <Megaphone className="w-7 h-7 group-hover:scale-110 transition-transform" />
          {/* Pulsing ring effect */}
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></span>
        </button>
      )}

      {/* Popup modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden animate-scale-in scrollbar-hide">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            </button>

            {/* Announcement image */}
            <Image
              src={announcement.image}
              alt={announcement.imageAlt || announcement.title || "Aktion"}
              width={800}
              height={1000}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Optional text + CTA panel (only when configured) */}
            {(hasContent || hasButton) && (
              <div className="p-4 sm:p-6 bg-gradient-to-t from-white to-transparent">
                {announcement.title && (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {announcement.title}
                  </h2>
                )}
                {announcement.description && (
                  <p className="text-gray-600 text-sm sm:text-base mb-4">{announcement.description}</p>
                )}
                {hasButton && (
                  <Button
                    onClick={handleButtonClick}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    {announcement.buttonText}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slow-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slow-bounce {
          animation: slow-bounce 3s ease-in-out infinite;
        }

        /* Hide scrollbars while maintaining scroll functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
