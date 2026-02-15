"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Car,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Globe,
  Phone,
  MapPin,
  Clock,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  User,
} from "lucide-react"
import { LottieAnimation } from "@/components/lottie-animation"
import emailjs from "@emailjs/browser"
import Link from "next/link"
import { ReviewsSection } from "@/components/reviews-section"

// Dynamic import for Elfsight widget to prevent hydration issues
const ElfsightReviews = dynamic(
  () =>
    Promise.resolve(() => (
      <div className="elfsight-app-e1b3b955-e48e-4ee8-a212-977e492efaa4" data-elfsight-app-lazy></div>
    )),
  { ssr: false },
)

export default function FahrschulePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeSidebarSection, setActiveSidebarSection] = useState("navigation")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agbAccepted: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [selectedPackage, setSelectedPackage] = useState<string>("")

  // Video state management
  const [isVideoMuted, setIsVideoMuted] = useState(false) // Start unmuted
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["startseite", "angebot", "fahrlehrer", "preise", "ueber-uns", "bewertungen", "kontakt"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set([...prev, entry.target.id]))
        }
      })
    }, observerOptions)

    // Video visibility observer for auto-mute functionality
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "teacher-video") {
            setIsVideoVisible(entry.isIntersecting)
            if (videoRef.current) {
              if (entry.isIntersecting) {
                // Video is visible - play and keep current mute state
                videoRef.current.play()
                setIsVideoPlaying(true)
              } else {
                // Video is not visible - pause and mute
                videoRef.current.pause()
                setIsVideoPlaying(false)
                if (!isVideoMuted) {
                  setIsVideoMuted(true)
                  videoRef.current.muted = true
                }
              }
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    // Use a timeout to ensure DOM is ready and observe elements
    const setupObserver = () => {
      const animatedElements = document.querySelectorAll("[data-animate]")
      animatedElements.forEach((el) => {
        observer.observe(el)
      })

      // Observe the video for auto-mute functionality
      const teacherVideo = document.getElementById("teacher-video")
      if (teacherVideo) {
        videoObserver.observe(teacherVideo)
      }
    }

    // Set up observer after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(setupObserver, 100)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
      videoObserver.disconnect()
      clearTimeout(timeoutId)
    }
  }, [isVideoMuted])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const services = [
    {
      title: "Kategorie B (Auto)",
      description: "Führerschein für Personenwagen bis 3.5t",
      features: [
        "Nothelferkurs",
        "Theorieunterricht",
        "Praktische Fahrstunden",
        "Verkehrskundeunterricht (VKU)",
        "Prüfungsvorbereitung",
      ],
      icon: <Car className="h-8 w-8" />,
    },
    {
      title: "Kategorie B BPT 121 (Taxi)",
      description: "Führerschein für berufsmässigen Personentransport",
      features: ["Theorieunterricht", "Praktische Fahrstunden", "Prüfungsvorbereitung"],
      icon: <Clock className="h-8 w-8" />,
    },
    {
      title: "Kontrollfahrt",
      description: "Für Besitzer ausländischer Führerausweise",
      features: ["Kompetente Beratung", "Praktische Fahrstunden", "Prüfungsvorbereitung"],
      icon: <Users className="h-8 w-8" />,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // EmailJS configuration - Replace with your actual values
      await emailjs.send(
        "service_053ed8o", // Your service ID
        "template_2tlhjo6", // Your new template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Fahrschule 06",
        },
        "XKVNSypCYuDXoJ-Oo", // Your public key
      )

      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        agbAccepted: false,
      })
    } catch (error) {
      console.error("Email send failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName)
    setFormData((prev) => ({
      ...prev,
      message: `Hallo, ich interessiere mich für das ${packageName}. Bitte kontaktieren Sie mich für weitere Informationen.`,
    }))
    scrollToSection("kontakt")
  }

  // Video control functions
  const toggleVideoMute = () => {
    if (videoRef.current) {
      const newMutedState = !isVideoMuted
      setIsVideoMuted(newMutedState)
      videoRef.current.muted = newMutedState
    }
  }

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.current.play()
        setIsVideoPlaying(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a
          href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp kontaktieren"
          className="flex items-center justify-center w-14 h-14 bg-green-500/90 hover:bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>
      {/* Header with Navigation */}
      <header>
        <nav aria-label="Hauptnavigation" className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/logo-blue.svg" alt="Fahrschule 06 Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <span className="text-xl font-bold text-[#1351d8] block">Fahrschule 06</span>
                <p className="text-xs text-gray-600">fahrschule06.ch</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8 list-none m-0 p-0">
              {["Startseite", "Angebot", "Fahrlehrer", "Preise", "Über uns", "Bewertungen", "Kontakt"].map((item, index) => {
                const sectionId = ["startseite", "angebot", "fahrlehrer", "preise", "ueber-uns", "bewertungen", "kontakt"][index]
                return (
                  <li key={item}>
                    <a
                      href={`#${sectionId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(sectionId)
                      }}
                      className={`text-sm font-medium transition-colors hover:text-[#1351d8] ${
                        activeSection === sectionId ? "text-[#1351d8]" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("kontakt")
                  }}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#1351d8] hover:bg-[#1351d8]/90 text-white h-10 px-4 py-2"
                >
                  Jetzt anmelden
                </a>
              </li>
            </ul>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-[#1351d8]">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - New Sidebar Design */}
          {isMenuOpen && (
            <div
              className="md:hidden fixed inset-0 top-16 bg-white shadow-lg border-t border-gray-200 overflow-hidden flex"
              style={{ zIndex: 60, height: "calc(100vh - 4rem)" }}
            >
              {/* Sidebar */}
              <div className="w-20 bg-[#1351d8] flex flex-col relative">
                {/* Navigation Button */}
                <button
                  onClick={() => setActiveSidebarSection("navigation")}
                  className={`flex-1 flex flex-col items-center justify-center py-8 text-white transition-all duration-300 relative ${
                    activeSidebarSection === "navigation" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap tracking-widest">
                    Navigation
                  </span>
                  {/* Active indicator - double circle spanning sidebar and content */}
                  {activeSidebarSection === "navigation" && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      {/* Outer white circle */}
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        {/* Inner blue circle */}
                        <div className="w-3 h-3 bg-[#1351d8] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>

                {/* Social Button */}
                <button
                  onClick={() => setActiveSidebarSection("social")}
                  className={`flex-1 flex flex-col items-center justify-center py-8 text-white transition-all duration-300 relative ${
                    activeSidebarSection === "social" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap tracking-widest">
                    Sozial
                  </span>
                  {/* Active indicator - double circle spanning sidebar and content */}
                  {activeSidebarSection === "social" && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      {/* Outer white circle */}
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        {/* Inner blue circle */}
                        <div className="w-3 h-3 bg-[#1351d8] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>

                {/* Legal Button */}
                <button
                  onClick={() => setActiveSidebarSection("legal")}
                  className={`flex-1 flex flex-col items-center justify-center py-8 text-white transition-all duration-300 relative ${
                    activeSidebarSection === "legal" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap tracking-widest">
                    Rechtliches
                  </span>
                  {/* Active indicator - double circle spanning sidebar and content */}
                  {activeSidebarSection === "legal" && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      {/* Outer white circle */}
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        {/* Inner blue circle */}
                        <div className="w-3 h-3 bg-[#1351d8] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto bg-white">
                {/* Simple close button in top right 
                  <div className="flex justify-end p-4">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>*/}

                <div className="px-6 pb-6">
                  {/* Navigation Section */}
                  {activeSidebarSection === "navigation" && (
                    <nav aria-label="Mobile Navigation" className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Navigation</h3>
                      <ul className="space-y-3 list-none m-0 p-0">
                        {["Startseite", "Angebot", "Fahrlehrer", "Preise", "Über uns", "Bewertungen", "Kontakt"].map(
                          (item, index) => {
                            const sectionId = ["startseite", "angebot", "fahrlehrer", "preise", "ueber-uns", "bewertungen", "kontakt"][
                              index
                            ]
                            return (
                              <li key={item}>
                                <a
                                  href={`#${sectionId}`}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    scrollToSection(sectionId)
                                  }}
                                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                                >
                                  {item}
                                </a>
                              </li>
                            )
                          },
                        )}
                      </ul>
                      <div className="pt-4">
                        <a
                          href="#kontakt"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToSection("kontakt")
                          }}
                          className="block w-full text-center bg-[#1351d8] hover:bg-[#1351d8]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                        >
                          Jetzt anmelden
                        </a>
                      </div>
                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <a
                          href="tel:+41763402201"
                          className="flex items-center space-x-3 text-[#1351d8] hover:text-[#1351d8]/80 transition-colors p-3 rounded-lg hover:bg-blue-50"
                        >
                          <Phone className="w-5 h-5" />
                          <span className="font-medium">+41 76 340 22 01</span>
                        </a>

                        <a
                          href="mailto:info@fahrschule06.ch"
                          className="flex items-center space-x-3 text-[#1351d8] hover:text-[#1351d8]/80 transition-colors p-3 rounded-lg hover:bg-blue-50"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium">info@fahrschule06.ch</span>
                        </a>

                        <a
                          href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors p-3 rounded-lg hover:bg-green-50"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          <span className="font-medium">WhatsApp</span>
                        </a>
                      </div>
                    </nav>
                  )}

                  {/* Social Section */}
                  {activeSidebarSection === "social" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Sozial</h3>
                      <p className="text-gray-600 mb-6">
                        Folgen Sie uns auf unseren Social Media Kanälen für Updates und Neuigkeiten!
                      </p>

                      <div className="space-y-4">
                        <a
                          href="https://www.instagram.com/fahrschule06/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.017 2.016c2.687 0 3.007.01 4.067.059 1.06.048 1.636.228 2.02.378.507.197.87.433 1.25.813.38.38.616.743.813 1.25.15.384.33.96.378 2.02.049 1.06.059 1.38.059 4.067 0 2.687-.01 3.007-.059 4.067-.048 1.06-.228 1.636-.378 2.02-.197.507-.433.87-.813 1.25-.38.38-.743.616-1.25.813-.384.15-.96.33-2.02.378-1.06.049-1.38.059-4.067.059-2.687 0-3.007-.01-4.067-.059-1.06-.048-1.636-.228-2.02-.378-.507-.197-.87-.433-1.25-.813-.38-.38-.616.743-.813-1.25-.15-.384.33.96.378-2.02-.049-1.06-.059-1.38-.059-4.067 0-2.687.01-3.007.059-4.067.048-1.06.228-1.636.378-2.02.197-.507.433-.87.813-1.25.38-.38.743-.616 1.25-.813.384-.15.96-.33 2.02-.378 1.06-.049 1.38-.059 4.067-.059zm0-2.016c-2.734 0-3.077.012-4.15.062-1.071.049-1.803.22-2.444.469-.661.257-1.223.602-1.782 1.161-.559.559-.904 1.121-1.161 1.782-.249.641-.42 1.373-.469 2.444-.05 1.073-.062 1.416-.062 4.15 0 2.734.012 3.077.062 4.15.049 1.071.22 1.803.469 2.444.257.661.602 1.223 1.161 1.782.559.559 1.121.904 1.782 1.161.641.249 1.373.42 2.444.469 1.073.05 1.416.062 4.15.062 2.734 0 3.077-.012 4.15-.062 1.071-.049 1.803-.22 2.444-.469.661-.257 1.223-.602 1.782-1.161.559-.559.904-1.121 1.161-1.782.249-.641.42-1.373.469-2.444.05-1.073.062-1.416.062-4.15 0-2.734-.012-3.077-.062-4.15-.049-1.071-.22-1.803-.469-2.444-.257-.661-.602-1.223-1.161-1.782-.559-.559-1.121-.904-1.782-1.161-.641-.249-1.373-.42-2.444-.469-1.073-.05-1.416-.062-4.15-.062zm0 5.838c-2.403 0-4.35 1.947-4.35 4.35 0 2.403 1.947 4.35 4.35 4.35 2.403 0 4.35-1.947 4.35-4.35 0-2.403-1.947-4.35-4.35-4.35zm0 7.175c-1.564 0-2.825-1.261-2.825-2.825 0-1.564 1.261-2.825 2.825-2.825 1.564 0 2.825 1.261 2.825 2.825 0 1.564-1.261 2.825-2.825 2.825zm5.538-7.362c0 .561-.455 1.016-1.016 1.016-.561 0-1.016-.455-1.016-1.016 0-.561.455-1.016 1.016-1.016.561 0 1.016.455 1.016 1.016z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-[#1351d8]">Instagram</p>
                            <p className="text-sm text-gray-600">@fahrschule06</p>
                          </div>
                        </a>

                        <a
                          href="https://www.facebook.com/vaxhid.mustafa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
                        >
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-[#1351d8]">Facebook</p>
                            <p className="text-sm text-gray-600">Fahrschule 06</p>
                          </div>
                        </a>

                        <a
                          href="https://www.tiktok.com/@fahrschule_06"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
                        >
                          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-[#1351d8]">TikTok</p>
                            <p className="text-sm text-gray-600">@fahrschule_06</p>
                          </div>
                        </a>

                        <a
                          href="https://www.linkedin.com/in/vaxhid-mustafa-ab8574210/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
                        >
                          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-[#1351d8]">LinkedIn</p>
                            <p className="text-sm text-gray-600">Vaxhid Mustafa</p>
                          </div>
                        </a>

                        <div className="pt-4 border-t border-gray-200">
                          <a
                            href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-colors w-full shadow-lg"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                            <span className="font-medium">WhatsApp öffnen</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Legal Section */}
                  {activeSidebarSection === "legal" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Rechtliches</h3>
                      <div className="space-y-4">
                        <Link
                          href="/impressum"
                          className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Impressum
                        </Link>
                        <div className="px-4 py-4 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="mb-3 font-semibold text-gray-900">Fahrschule 06</p>
                          <div className="space-y-1">
                            <p>Inhaber: Vaxhid Mustafa</p>
                            <p>Oberdorf 4, 5057 Reitnau</p>
                            <p>info@fahrschule06.ch</p>
                            <p>+41 76 340 22 01</p>
                          </div>
                        </div>
                        <div className="pt-4 text-xs text-gray-500 text-center">
                          <p>&copy; 2025 Fahrschule 06. Alle Rechte vorbehalten.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section with subtle parallax */}
      <section id="startseite" className="relative pt-16 bg-gradient-to-br from-[#1351d8]/5 to-white overflow-hidden">
        {/* Subtle background elements with parallax */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#1351d8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up" data-animate="hero-content" id="hero-content">
              <div className="space-y-4">
                <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20">Fahren mit Vision</Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Willkommen bei <span className="text-[#1351d8]">Fahrschule 06</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Deine professionelle Fahrschule im Raum Aargau/Olten. Mit einem modernen Fahrzeug, erfahrenem
                  Fahrlehrer und individueller Betreuung bringe ich dich sicher zum Führerschein.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-lg px-8 text-white"
                  onClick={() => scrollToSection("kontakt")}
                >
                  Jetzt anmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-[#1351d8] text-[#1351d8] hover:bg-[#1351d8]/5 bg-transparent"
                  onClick={() => scrollToSection("angebot")}
                >
                  Services entdecken
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1351d8]">200+</div>
                  <div className="text-sm text-gray-600">Erfolgreiche Schüler</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1351d8]">3+</div>
                  <div className="text-sm text-gray-600">Jahre Erfahrung</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/hero-new-bg.webp"
                alt="Fahrschule 06 - Professioneller Fahrlehrer mit blauem Ford"
                width={600}
                height={800}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Dramatic Background */}
      <section id="angebot" className="relative py-16 overflow-hidden">
        {/* Dark textured background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Textured overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1351d8]/20 via-transparent to-[#1351d8]/10"></div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#1351d8]/30 rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#1351d8]/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Integrated Hero Banner */}
          <div className="relative mb-16 lg:mb-20">
            {/* Main container with border effect */}
            <div className="relative bg-gradient-to-r from-[#1351d8]/20 via-[#1351d8]/10 to-[#1351d8]/20 rounded-3xl border-2 border-[#1351d8]/30 p-8 lg:p-12 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left side - Content */}
                <div className="text-white text-center lg:text-left space-y-6">
                  <div className="space-y-4">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                      <span className="text-[#1351d8]">Professionelle</span>
                      <br />
                      <span className="text-white">Fahrausbildung</span>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90">
                      im Raum Aargau/Olten
                    </div>
                    <div className="text-lg text-white/80 max-w-md mx-auto lg:mx-0">
                      Über 200 zufriedene Fahrschüler haben bereits erfolgreich ihre Prüfung mit mir bestanden.
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => scrollToSection("kontakt")}
                  >
                    MELDE DICH JETZT AN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Right side - Animation Area */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Always visible background decorative elements */}
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl scale-110"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-full p-4 border border-white/20 w-[320px] h-[320px] flex items-center justify-center">
                      {/* Background decorative elements - always visible */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white/60" />
                        </div>
                      </div>

                      {/* Lottie Animation - appears on top when loaded */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LottieAnimation
                          src="https://lottie.host/04e273e6-2479-441f-b3ff-ae7d8d2d383d/nwbCgzD7mZ.lottie"
                          width={280}
                          height={280}
                          speed={1}
                        />
                      </div>

                      {/* Orbiting background elements */}
                      <div className="absolute inset-0">
                        <div
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#1351d8]/20 rounded-full flex items-center justify-center animate-bounce"
                          style={{ animationDelay: "0s" }}
                        >
                          <Car className="h-4 w-4 text-white/60" />
                        </div>
                        <div
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-400/20 rounded-full animate-bounce"
                          style={{ animationDelay: "1s" }}
                        ></div>
                        <div
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#1351d8]/30 rounded-full animate-pulse"
                          style={{ animationDelay: "1.5s" }}
                        ></div>
                      </div>
                    </div>

                    {/* Floating elements around the circle */}
                    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-6 bg-[#1351d8]/30 rounded-full animate-pulse"></div>
                    <div
                      className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-green-400/30 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Header */}
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 backdrop-blur-sm">Unsere Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Professionelle Fahrausbildung</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Von der Theorie bis zur praktischen Prüfung - wir begleiten Sie auf Ihrem Weg zum Führerschein
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-4 bg-white/10 backdrop-blur-md relative overflow-hidden transform hover:bg-white/15 ${
                  visibleElements.has(`service-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-animate={`service-${index}`}
                id={`service-${index}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1351d8]/20 via-transparent to-[#1351d8]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#1351d8]/30 via-white/20 to-[#1351d8]/30 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10"></div>

                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white mb-2 group-hover:text-[#1351d8] transition-colors duration-300 font-semibold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-[#1351d8] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/20">
                    <Button
                      variant="outline"
                      className="w-full border-white/40 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/60 transition-all duration-300 bg-white/5 backdrop-blur-sm group-hover:shadow-lg"
                      onClick={() => scrollToSection("kontakt")}
                    >
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
        </div>
      </section>

      {/* Meet the Teacher Section */}
      <section id="fahrlehrer" className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">Ihr Fahrlehrer</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Lernen Sie mich kennen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Persönlich, professionell und mit Leidenschaft für die Fahrausbildung
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video */}
            <div className="relative lg:mx-auto lg:w-3/4">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group bg-gradient-to-br from-[#1351d8]/5 to-blue-50 p-3">
                <video
                  ref={videoRef}
                  id="teacher-video"
                  className="w-full h-auto rounded-xl"
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.play()
                    }
                  }}
                >
                  <source src="/fahrschule06_video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Elegant Video Controls Overlay */}
                <div className="absolute inset-2 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-none">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    {/* Left side - Play/Pause */}
                    <button
                      onClick={toggleVideoPlay}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1 group-hover/btn:scale-110 transition-transform" />
                      )}
                    </button>

                    {/* Right side - Mute/Unmute */}
                    <button
                      onClick={toggleVideoMute}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>

                  {/* Video Status Indicator */}
                  <div className="absolute top-4 right-4 pointer-events-none">
                    <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <div
                        className={`w-2 h-2 rounded-full ${isVideoPlaying ? "bg-green-400" : "bg-red-400"} animate-pulse`}
                      ></div>
                      <span className="text-white text-xs font-medium">
                        {isVideoPlaying ? (isVideoMuted ? "STUMM" : "TON AN") : "PAUSE"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle branding overlay - moved to top-left to avoid controls */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-sm font-medium">Vaxhid Mustafa - Ihr Fahrlehrer</p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#1351d8]/20 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400/30 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#1351d8]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Vaxhid Mustafa</h3>
                    <p className="text-[#1351d8] font-medium">Eidgenössisch diplomierter Fahrlehrer</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Hallo! Ich bin Vaxhid, Ihr persönlicher Fahrlehrer bei Fahrschule 06. Mit über 3 Jahren Erfahrung und
                  mehr als 200 erfolgreich ausgebildeten Fahrschülern bringe ich Sie sicher und entspannt zum
                  Führerschein.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Meine Philosophie ist einfach: Jeder lernt anders, und deshalb passe ich meinen Unterricht individuell
                  an Ihre Bedürfnisse an. Ob Sie nervös sind oder bereits Vorerfahrung haben - gemeinsam schaffen wir
                  das!
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Meine Qualifikationen:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Eidg. Fahrlehrerdiplom</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">VKU-Moderator</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Kategorie B & BPT 121</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">3+ Jahre Erfahrung</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#1351d8]/5 to-blue-50 rounded-xl p-6 border border-[#1351d8]/10">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#1351d8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-[#1351d8]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Mein Versprechen an Sie:</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "Ich begleite Sie geduldig und professionell auf Ihrem Weg zum Führerschein. Ihr Erfolg ist mein
                      Erfolg - und gemeinsam erreichen wir Ihr Ziel!"
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white"
                  onClick={() => scrollToSection("kontakt")}
                >
                  Jetzt Fahrstunde buchen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1351d8] text-[#1351d8] hover:bg-[#1351d8]/5 bg-transparent"
                  onClick={() => scrollToSection("preise")}
                >
                  Preise ansehen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="preise" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">Unsere Preise</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Transparente Preisgestaltung</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparente Preise ohne versteckte Kosten. Wählen Sie das Paket, das am besten zu Ihnen passt.
            </p>
          </div>

          {/* Individual Pricing Breakdown */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Einzelpreise</h3>
                <p className="text-gray-600">Flexible Buchung nach Ihren Bedürfnissen</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Fahrstunden */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Car className="h-5 w-5 text-[#1351d8] mr-2" />
                    Fahrstunden
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-gray-900">Einzellektion</span>
                        <span className="text-sm text-gray-500 block">45 min</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 85.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-gray-900">Doppellektion</span>
                        <span className="text-sm text-gray-500 block">90 min</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 160.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <span className="font-medium text-gray-900">Kontrollfahrt</span>
                        <span className="text-sm text-gray-500 block">90 min</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 160.-</span>
                    </div>
                  </div>
                </div>

                {/* Theorie */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 text-[#1351d8] mr-2" />
                    Theorie
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-gray-900">Einzellektion</span>
                        <span className="text-sm text-gray-500 block">45 min</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 55.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-gray-900">Doppellektion</span>
                        <span className="text-sm text-gray-500 block">90 min</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 90.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-gray-900">VKU</span>
                        <span className="text-sm text-gray-500 block">4 Teile (à 2h)</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-[#1351d8]">CHF 160.-</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <span className="font-medium text-gray-900">Nothelferkurs</span>
                        <span className="text-sm text-gray-500 block">2 Teile (à 5h)</span>
                      </div>
                      <span className="font-semibold text-[#1351d8]">CHF 120.-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition Bridge */}
            <div className="text-center mt-12 mb-8">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-[#1351d8]/10 via-[#1351d8]/5 to-[#1351d8]/10 px-8 py-4 rounded-full border border-[#1351d8]/20">
                <div className="text-sm text-gray-600">Einzelbuchung zu teuer?</div>
                <ArrowRight className="h-4 w-4 text-[#1351d8]" />
                <div className="text-sm font-semibold text-[#1351d8]">Sparen Sie mit unseren Paketen!</div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Grundpauschale</h3>
                <p className="text-gray-600 mb-4">
                  Die Grundpauschale beinhaltet einen Versicherungsanteil sowie die Fahrschüleradministration. Die
                  Pauschale ist einmalig zu Bezahlen und beläuft sich auf Fr. 100.-
                </p>
                <div className="inline-flex items-center bg-[#1351d8]/10 text-[#1351d8] px-6 py-3 rounded-full font-semibold">
                  CHF 100.- einmalig
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basis Paket */}
            <Card
              className={`relative border-2 border-gray-200 hover:border-[#1351d8]/30 transition-all duration-500 hover:scale-105 ${visibleElements.has("price-basic") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              data-animate="price-basic"
              id="price-basic"
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Basis Paket</CardTitle>
                <p className="text-gray-600 mb-6">Ideal für Einsteiger</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 850</span>
                  <span className="text-gray-600">.-</span>
                  <div className="text-sm text-green-600 font-medium mt-2">Sie sparen CHF 50.-</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">10 Fahrstunden à 45 Min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Grundpauschale</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Individuelle Betreuung</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
                    onClick={() => handlePackageSelect("Basis Paket")}
                  >
                    Paket wählen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Komfort Paket */}
            <Card
              className={`relative border-2 border-[#1351d8] hover:border-[#1351d8] transition-all duration-500 hover:scale-105 shadow-lg ${visibleElements.has("price-comfort") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              data-animate="price-comfort"
              id="price-comfort"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#1351d8] text-white px-4 py-1 text-sm font-medium">⭐ Beliebt</Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Komfort Paket</CardTitle>
                <p className="text-gray-600 mb-6">Unser beliebtes Angebot</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 950</span>
                  <span className="text-gray-600">.-</span>
                  <div className="text-sm text-green-600 font-medium mt-2">Sie sparen CHF 110.-</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">10 Fahrstunden à 45 Min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Verkehrskundeunterricht (VKU)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Grundpauschale</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Individuelle Betreuung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsanmeldung</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-[#1351d8]/90 hover:bg-[#1351d8] text-white transition-colors duration-300"
                    onClick={() => handlePackageSelect("Komfort Paket")}
                  >
                    Paket wählen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Paket */}
            <Card
              className={`relative border-2 border-gray-200 hover:border-[#1351d8]/30 transition-all duration-500 hover:scale-105 ${visibleElements.has("price-premium") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              data-animate="price-premium"
              id="price-premium"
              style={{ animationDelay: "400ms" }}
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Premium Paket</CardTitle>
                <p className="text-gray-600 mb-6">Rundum-sorglos-Paket</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 1,790</span>
                  <span className="text-gray-600">.-</span>
                  <div className="text-sm text-green-600 font-medium mt-2">Sie sparen CHF 230.-</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">20 Fahrstunden à 45 Min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Verkehrskundeunterricht (VKU)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Grundpauschale</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Individuelle Betreuung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">1 Prüfungssimulation à 90 Min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsanmeldung</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
                    onClick={() => handlePackageSelect("Premium Paket")}
                  >
                    Paket wählen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="ueber-uns" className="py-16 bg-gradient-to-br from-[#1351d8]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20">Über uns</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Deine Fahrschule in der Region Aargau/Olten
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fahrschule 06 steht für moderne Fahrausbildung im Raum Aargau/Olten. Mit meiner Erfahrung, modernem
                Fahrzeug und individueller Betreuung bringen wir dich sicher und entspannt zum Führerschein - ganz nach
                unserem Motto: Fahren mit Vision.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">
                    Eidgenössisch Diplomierter Fahrlehrer mit langjähriger Erfahrung
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">
                    Modernes Fahrzeug mit neuester Sicherheitstechnik und Ausstattung
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">Massgeschneiderte Betreuung und flexible Terminplanung</span>
                </div>
              </div>
            </div>

            {/* Fixed layout - Photos and Video aligned properly */}
            <div className="flex gap-4 items-start">
              {/* Left side - Two stacked photos */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="relative overflow-hidden rounded-xl shadow-lg h-48">
                  <Image
                    src="/instructor-with-car.webp"
                    alt="Fahrlehrer mit Fahrschule 06 Auto"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl shadow-lg h-48">
                  <Image
                    src="/instructor-in-car.webp"
                    alt="Fahrlehrer im Fahrschule 06 Auto"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Right side - Video with exact height matching */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <video
                    className="w-48 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 object-cover"
                    style={{ height: "400px" }} // Exact height to match two photos + gap
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Subtle overlay for branding */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm font-medium text-center">
                      Fahrschule 06 - Fahren mit Vision
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">FAQ</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
            <p className="text-xl text-gray-600">Antworten auf die wichtigsten Fragen zur Fahrausbildung</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Was kostet der Führerschein bei Fahrschule 06?",
                answer: "Die Kosten hängen von der Anzahl der benötigten Fahrstunden oder dem gewählten Paket ab. Eine Fahrstunde (45 Min.) kostet CHF 85.–, der VKU-Kurs CHF 160.–, der Nothelferkurs CHF 120.– sowie eine einmalige Grundpauschale von CHF 100.–. Alternativ gibt es Pakete: das Basis-Paket mit 10 Fahrstunden für CHF 850.–, das Komfort-Paket mit 10 Fahrstunden, VKU und Anmeldung für CHF 950.– oder das Premium-Paket mit 20 Fahrstunden, VKU und Prüfungssimulation für CHF 1'790.–."
              },
              {
                question: "Wie lange dauert die Fahrausbildung?",
                answer: "Die Dauer ist individuell. Wichtig: Gemäss Schweizer Gesetz müssen Fahrschüler im Alter von 17, 18 und 19 Jahren nach Erhalt des Lernfahrausweises mindestens 12 Monate warten, bevor sie zur praktischen Prüfung antreten dürfen. Ab 20 Jahren entfällt diese Wartefrist. Der VKU-Kurs dauert 8 Stunden und wird an 2 Abenden absolviert."
              },
              {
                question: "Was ist der VKU (Verkehrskundeunterricht)?",
                answer: "Der Verkehrskundeunterricht (VKU) ist ein obligatorischer 8-stündiger Theoriekurs für alle Führerschein-Anwärter. Er behandelt Themen wie Verkehrssehen, Verkehrsumwelt, Verkehrsdynamik und Verkehrstaktik. Der VKU muss vor der praktischen Prüfung absolviert werden."
              },
              {
                question: "Wo findet die Fahrausbildung statt?",
                answer: "Die Fahrausbildung findet im Raum Aargau und Olten statt. Wir holen dich gerne an deinem Wohnort, Arbeitsplatz oder Bahnhof ab. Der VKU-Kurs wird in Aarau durchgeführt. Die praktische Fahrprüfung findet beim Strassenverkehrsamt in Aarau oder Olten statt."
              },
              {
                question: "Wie kann ich mich anmelden?",
                answer: "Du kannst dich ganz einfach per WhatsApp, Telefon (+41 76 340 22 01) oder über das Kontaktformular auf dieser Website anmelden. Für die Anmeldung benötigst du einen gültigen Lernfahrausweis. Falls du noch keinen hast, helfen wir dir gerne bei den ersten Schritten."
              },
              {
                question: "Wo finde ich die Allgemeinen Geschäftsbedingungen (AGB)?",
                answer: "agb_special"
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-900 text-left pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 ml-2 text-[#1351d8] group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer === "agb_special" ? (
                    <>
                      Unsere AGB regeln alle wichtigen Punkte rund um die Fahrausbildung bei Fahrschule 06 -- darunter Buchung und Bezahlung von Fahrstunden, Annullierungsbedingungen, VKU-Kursregelungen, Geschenkgutscheine sowie Datenschutz und Haftung. Wir empfehlen dir, die AGB vor Beginn der Ausbildung durchzulesen.{" "}
                      <Link href="/agb/" className="text-[#1351d8] hover:underline font-medium">
                        Hier findest du unsere vollständigen AGB
                      </Link>
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">Kontakt</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Jetzt Kontakt aufnehmen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bereit für Ihren Führerschein? Kontaktieren Sie uns für eine kostenlose Beratung
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformationen</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[#1351d8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Telefon</div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                        <a
                          href="tel:+41763402201"
                          className="text-[#1351d8] hover:text-[#1351d8]/80 font-medium transition-colors"
                        >
                          +41 76 340 22 01
                        </a>
                        <a
                          href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-green-500/90 hover:bg-green-500 text-white px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-[#1351d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">E-Mail</div>
                      <div className="flex flex-col space-y-1">
                        <a
                          href="mailto:info@fahrschule06.ch"
                          className="text-[#1351d8] hover:text-[#1351d8]/80 font-medium transition-colors"
                        >
                          info@fahrschule06.ch
                        </a>
                        <span className="text-sm text-gray-500">oder nutzen Sie das Formular auf der Seite</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[#1351d8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Adresse</div>
                      <div className="text-gray-600">
                        Oberdorf 4
                        <br />
                        5057 Reitnau
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-[#1351d8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Website</div>
                      <div className="text-gray-600">fahrschule06.ch</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#1351d8]/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#1351d8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Öffnungszeiten</div>
                      <div className="text-gray-600">Mo-Sa: 08:00 - 20:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Nachricht senden</CardTitle>
                <CardDescription>
                  Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1.5 block tracking-tight">Vorname</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ihr Vorname"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1.5 block tracking-tight">Nachname</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Ihr Nachname"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block tracking-tight">E-Mail</label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ihre.email@beispiel.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block tracking-tight">Telefon</label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1.5 block tracking-tight">Nachricht</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agbAccepted"
                      name="agbAccepted"
                      checked={formData.agbAccepted}
                      onChange={(e) => setFormData((prev) => ({ ...prev, agbAccepted: e.target.checked }))}
                      required
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1351d8] focus:ring-[#1351d8] cursor-pointer"
                    />
                    <label htmlFor="agbAccepted" className="text-sm text-gray-600 cursor-pointer">
                      Ich habe die{" "}
                      <a href="/agb/" target="_blank" className="text-[#1351d8] hover:underline font-medium">
                        Allgemeinen Geschäftsbedingungen (AGB)
                      </a>{" "}
                      gelesen und akzeptiere diese.
                    </label>
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 text-sm">
                        ✅ Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 text-sm">
                        ❌ Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1351d8] hover:bg-[#1351d8]/90 disabled:opacity-50 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Nachricht senden
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/logo.svg" alt="Fahrschule 06 Logo" width={32} height={32} className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-bold">Fahrschule 06</h3>
                  <p className="text-sm text-gray-400">fahrschule06.ch</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Ihre professionelle Fahrschule in der Region Aargau/Olten für eine sichere und entspannte
                Fahrausbildung.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Kategorie B (Auto)</li>
                <li>Kategorie B BPT 121 (Taxi)</li>
                <li>Kontrollfahrt</li>
                <li>Theorieunterricht</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+41 76 340 22 01</li>
                <li>info@fahrschule06.ch</li>
                <li>Oberdorf 4</li>
                <li>5057 Reitnau</li>
                <li>fahrschule06.ch</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Öffnungszeiten</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Mo-Sa: 08:00 - 20:00</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Folgen Sie uns</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/vaxhid.mustafa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/fahrschule06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 2.016c2.687 0 3.007.01 4.067.059 1.06.048 1.636.228 2.02.378.507.197.87.433 1.25.813.38.38.616.743.813 1.25.15.384.33.96.378 2.02.049 1.06.059 1.38.059 4.067 0 2.687-.01 3.007-.059 4.067-.048 1.06-.228 1.636-.378 2.02-.197.507-.433.87-.813 1.25-.38.38-.743.616-1.25.813-.384.15-.96.33-2.02.378-1.06.049-1.38.059-4.067.059-2.687 0-3.007-.01-4.067-.059-1.06-.048-1.636-.228-2.02-.378-.507-.197-.87-.433-1.25-.813-.38-.38-.616.743-.813-1.25-.15-.384.33.96.378-2.02-.049-1.06-.059-1.38-.059-4.067 0-2.687.01-3.007.059-4.067.048-1.06.228-1.636.378-2.02.197-.507.433-.87.813-1.25.38-.38.743-.616 1.25-.813.384-.15.96-.33 2.02-.378 1.06-.049 1.38-.059 4.067-.059zm0-2.016c-2.734 0-3.077.012-4.15.062-1.071.049-1.803.22-2.444.469-.661.257-1.223.602-1.782 1.161-.559.559-.904 1.121-1.161 1.782-.249.641-.42 1.373-.469 2.444-.05 1.073-.062 1.416-.062 4.15 0 2.734.012 3.077.062 4.15.049 1.071.22 1.803.469 2.444.257.661.602 1.223 1.161 1.782.559.559 1.121.904 1.782 1.161.641.249 1.373.42 2.444.469 1.073.05 1.416.062 4.15.062 2.734 0 3.077-.012 4.15-.062 1.071-.049 1.803-.22 2.444-.469.661-.257 1.223-.602 1.782-1.161.559-.559.904-1.121 1.161-1.782.249-.641.42-1.373.469-2.444.05-1.073.062-1.416.062-4.15 0-2.734-.012-3.077-.062-4.15-.049-1.071-.22-1.803-.469-2.444-.257-.661-.602-1.223-1.161-1.782-.559-.559-1.121-.904-1.782-1.161-.641-.249-1.373-.42-2.444-.469-1.073-.05-1.416-.062-4.15-.062zm0 5.838c-2.403 0-4.35 1.947-4.35 4.35 0 2.403 1.947 4.35 4.35 4.35 2.403 0 4.35-1.947 4.35-4.35 0-2.403-1.947-4.35-4.35-4.35zm0 7.175c-1.564 0-2.825-1.261-2.825-2.825 0-1.564 1.261-2.825 2.825-2.825 1.564 0 2.825 1.261 2.825 2.825 0 1.564-1.261 2.825-2.825 2.825zm5.538-7.362c0 .561-.455 1.016-1.016 1.016-.561 0-1.016-.455-1.016-1.016 0-.561.455-1.016 1.016-1.016.561 0 1.016.455 1.016 1.016z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@fahrschule_06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/vaxhid-mustafa-ab8574210/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p>&copy; 2025 Fahrschule 06. Alle Rechte vorbehalten.</p>
              <div className="flex gap-6">
                <Link
                  href="/impressum"
                  className="text-gray-400 hover:text-white transition-colors underline hover:no-underline font-medium"
                >
                  Impressum
                </Link>
                <Link
                  href="/agb/"
                  className="text-gray-400 hover:text-white transition-colors underline hover:no-underline font-medium"
                >
                  AGB
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
