"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ComingSoon({ onEnterSite }: { onEnterSite: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentStep, setCurrentStep] = useState(0)

  const fullText = "Bald verfügbar"
  const steps = ["Design", "Entwicklung", "Testing", "Launch"]

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!showContent) return

    let i = 0
    const typingTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingTimer)
      }
    }, 150)

    return () => clearInterval(typingTimer)
  }, [showContent])

  // Progress steps animation
  useEffect(() => {
    if (!showContent) return

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)

    return () => clearInterval(stepTimer)
  }, [showContent])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1351d8] via-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/15 rounded-full blur-xl animate-bounce delay-500"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/8 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/12 rounded-full blur-md animate-float-reverse"></div>
      </div>

      {/* Enhanced floating road and car elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <div className="w-16 h-1 bg-white rounded-full"></div>
          <div className="w-8 h-1 bg-white rounded-full mt-2 ml-4"></div>
        </div>
        <div className="absolute bottom-32 right-16 opacity-15 animate-float delay-700">
          <div className="w-20 h-1 bg-white rounded-full"></div>
          <div className="w-10 h-1 bg-white rounded-full mt-2 ml-6"></div>
        </div>
        <div className="absolute top-1/3 left-0 opacity-30 animate-drive-across">
          <div className="text-4xl">🚗</div>
        </div>
        <div className="absolute bottom-1/3 right-0 opacity-25 animate-construction">
          <div className="text-3xl animate-bounce">🔧</div>
        </div>
        <div className="absolute top-2/3 left-1/4 opacity-20 animate-float delay-1000">
          <div className="text-2xl">⚙️</div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo and brand */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Image
              src="/logo.svg"
              alt="Fahrschule 06 Logo"
              width={80}
              height={80}
              className="w-20 h-20 animate-spin-slow"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">Fahrschule 06</h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">fahrschule06.ch</p>
        </div>

        {/* Enhanced coming soon content */}
        <div
          className={`space-y-8 transition-all duration-1000 delay-300 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white min-h-[4rem] flex items-center justify-center">
              {typedText}
              <span className="animate-blink ml-1">|</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
              Wir arbeiten hart daran, Ihnen die beste Fahrschul-Erfahrung in Zürich zu bieten. Unsere neue Website wird
              bald online sein!
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-white to-blue-200 h-full rounded-full animate-loading-bar-enhanced"></div>
            </div>
            <div className="flex justify-between text-sm text-blue-200">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`transition-all duration-500 ${
                    index === currentStep ? "text-white font-bold scale-110" : ""
                  }`}
                >
                  {index === currentStep && <span className="animate-pulse">🔄 </span>}
                  {step}
                </div>
              ))}
            </div>
            <p className="text-blue-200 text-sm animate-pulse">Aktuell: {steps[currentStep]} in Bearbeitung...</p>
          </div>

          {/* Contact info with enhanced animations */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20 animate-glow">
            <h3 className="text-white font-semibold mb-4 animate-fade-in-delayed">
              Kontaktieren Sie uns bereits jetzt:
            </h3>
            <div className="space-y-3 text-blue-100">
              <a
                href="tel:+41763402201"
                className="flex items-center justify-center space-x-2 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <span className="animate-bounce">📞</span>
                <span>+41 76 340 22 01</span>
              </a>
              <a
                href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500/80 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 animate-pulse-green"
              >
                <span className="animate-bounce delay-200">💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
        @keyframes drive-across {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes construction {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loading-bar-enhanced {
          0% { width: 0%; }
          25% { width: 30%; }
          50% { width: 60%; }
          75% { width: 85%; }
          100% { width: 95%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
        }
        @keyframes pulse-green {
          0%, 100% { background-color: rgba(34, 197, 94, 0.8); }
          50% { background-color: rgba(34, 197, 94, 1); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 3.5s ease-in-out infinite;
        }
        .animate-drive-across {
          animation: drive-across 15s linear infinite;
        }
        .animate-construction {
          animation: construction 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-loading-bar-enhanced {
          animation: loading-bar-enhanced 4s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fade-in-up 1s ease-out 0.5s both;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-pulse-green {
          animation: pulse-green 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
