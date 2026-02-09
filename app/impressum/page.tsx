"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Menu, X, Globe, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function ImpressumPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("impressum")
  const [activeSidebarSection, setActiveSidebarSection] = useState("navigation")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo-blue.svg" alt="Fahrschule 06 Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-[#1351d8]">Fahrschule 06</h1>
                <p className="text-xs text-gray-600">fahrschule06.ch</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Startseite
              </Link>
              <Link
                href="/#angebot"
                className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors"
              >
                Angebot
              </Link>
              <Link
                href="/#preise"
                className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors"
              >
                Preise
              </Link>
              <Link href="/#ueber-uns" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Über uns
              </Link>
              <Link
                href="/#kontakt"
                className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors"
              >
                Kontakt
              </Link>
              <Link href="/#kontakt">
                <Button className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white">Jetzt anmelden</Button>
              </Link>
            </div>

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
              <div className="w-20 bg-[#1351d8] flex flex-col">
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
                <div className="px-6 pb-6">
                  {/* Navigation Section */}
                  {activeSidebarSection === "navigation" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Navigation</h3>
                      <div className="space-y-3">
                        <Link
                          href="/"
                          className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Startseite
                        </Link>
                        <Link
                          href="/#angebot"
                          className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Angebot
                        </Link>
                        <Link
                          href="/#preise"
                          className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Preise
                        </Link>
                        <Link
                          href="/#ueber-uns"
                          className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Über uns
                        </Link>
                        <Link
                          href="/#kontakt"
                          className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Kontakt
                        </Link>
                      </div>
                      <div className="pt-4">
                        <Link href="/#kontakt">
                          <Button className="w-full bg-[#1351d8] hover:bg-[#1351d8]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
                            Jetzt anmelden
                          </Button>
                        </Link>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                    </div>
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
                          className="block px-4 py-3 text-base font-medium text-[#1351d8] bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20"
                        >
                          Impressum (Aktuelle Seite)
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

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button - Convert to blue button */}
          <div className="mb-8">
            <Link href="/">
              <Button className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white font-bold">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zur Hauptseite
              </Button>
            </Link>
          </div>

          {/* Impressum Content */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">Impressum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Kontaktdaten</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                  <p className="font-semibold text-gray-900">Fahrschule 06</p>
                  <p className="text-gray-700">Inhaber: Vaxhid Mustafa</p>
                  <p className="text-gray-700">Oberdorf 4</p>
                  <p className="text-gray-700">5057 Reitnau</p>
                  <p className="text-gray-700">Telefon: +41 76 340 22 01</p>
                  <p className="text-gray-700">E-Mail: info@fahrschule06.ch</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Haftungsausschluss</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit,
                    Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem
                    Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der
                    Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder
                    das gesamte Angebot ohne besondere Ankündigung zu verändern, zu ergänzen, zu löschen oder die
                    Veröffentlichung zeitweise oder endgültig einzustellen.
                  </p>
                </div>
              </div>

              {/* Links Disclaimer */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Haftungsausschluss für Links</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird
                    jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten
                    erfolgen auf eigene Gefahr des jeweiligen Nutzers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    <path d="M12.017 2.016c2.687 0 3.007.01 4.067.059 1.06.048 1.636.228 2.02.378.507.197.87.433 1.25.813.38.38.616.743.813 1.25.15.384.33.96.378 2.02.049 1.06.059 1.38.059 4.067 0 2.687-.01 3.007-.059 4.067-.048 1.06-.228 1.636-.378 2.02-.197.507-.433.87-.813 1.25-.38.38-.743.616-1.25.813-.384.15-.96.33-2.02.378-1.06.049-1.38.059-4.067.059-2.687 0-3.007-.01-4.067-.059-1.06-.048-1.636-.228-2.02-.378-.507-.197-.87-.433-1.25-.813-.38-.38-.616-.743-.813-1.25-.15-.384-.33-.96-.378-2.02-.049-1.06-.059-1.38-.059-4.067 0-2.687.01-3.007.059-4.067.048-1.06.228-1.636.378-2.02.197-.507.433-.87.813-1.25.38-.38.743-.616 1.25-.813.384-.15.96-.33 2.02-.378 1.06-.049 1.38-.059 4.067-.059zm0-2.016c-2.734 0-3.077.012-4.15.062-1.071.049-1.803.22-2.444.469-.661.257-1.223.602-1.782 1.161-.559.559-.904 1.121-1.161 1.782-.249.641-.42 1.373-.469 2.444-.05 1.073-.062 1.416-.062 4.15 0 2.734.012 3.077.062 4.15.049 1.071.22 1.803.469 2.444.257.661.602 1.223 1.161 1.782.559.559 1.121.904 1.782 1.161.641.249 1.373.42 2.444.469 1.073.05 1.416.062 4.15.062 2.734 0 3.077-.012 4.15-.062 1.071-.049 1.803-.22 2.444-.469.661-.257 1.223-.602 1.782-1.161.559-.559.904-1.121 1.161-1.782.249-.641.42-1.373.469-2.444.05-1.073.062-1.416.062-4.15 0-2.734-.012-3.077-.062-4.15-.049-1.071-.22-1.803-.469-2.444-.257-.661-.602-1.223-1.161-1.782-.559-.559-1.121-.904-1.782-1.161-.641-.249-1.373-.42-2.444-.469-1.073-.05-1.416-.062-4.15-.062zm0 5.838c-2.403 0-4.35 1.947-4.35 4.35 0 2.403 1.947 4.35 4.35 4.35 2.403 0 4.35-1.947 4.35-4.35 0-2.403-1.947-4.35-4.35-4.35zm0 7.175c-1.564 0-2.825-1.261-2.825-2.825 0-1.564 1.261-2.825 2.825-2.825 1.564 0 2.825 1.261 2.825 2.825 0 1.564-1.261 2.825-2.825 2.825zm5.538-7.362c0 .561-.455 1.016-1.016 1.016-.561 0-1.016-.455-1.016-1.016 0-.561.455-1.016 1.016-1.016.561 0 1.016.455 1.016 1.016z" />
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
              <p>&copy; 2024 Fahrschule 06. Alle Rechte vorbehalten.</p>
              <Link
                href="/impressum"
                className="text-gray-400 hover:text-white transition-colors underline hover:no-underline font-medium"
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
