"use client"

import { useState, useEffect } from "react"
import { X, Gift } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  const handleReopen = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  if (!isOpen && !isMinimized) return null

  return (
    <>
      {/* Floating Button to Reopen */}
      {isMinimized && !isOpen && (
        <button
          onClick={handleReopen}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group animate-slow-bounce hover:animate-none"
          aria-label="Weihnachtsaktion anzeigen"
        >
          <Gift className="w-7 h-7 group-hover:scale-110 transition-transform" />
          {/* Pulsing ring effect */}
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></span>
        </button>
      )}

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden animate-scale-in scrollbar-hide">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            </button>

            {/* Promo Image */}
            <div className="relative w-full">
              <Image
                src="/christmas-promo.png"
                alt="Fahrschule 06 Weihnachtsaktion - 10% Rabatt auf Gutscheine"
                width={800}
                height={1200}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* CTA Button */}
            <div className="p-6 bg-gradient-to-t from-white to-transparent">
              <Button
                onClick={() => {
                  handleClose()
                  // Scroll to contact section
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                <Gift className="w-5 h-5 mr-2" />
                Jetzt Gutschein sichern!
              </Button>
            </div>
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
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </>
  )
}
