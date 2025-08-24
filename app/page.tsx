"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, Clock, Car, Users, Award, Star, CheckCircle, ArrowRight, Menu, X, Globe } from "lucide-react"
import Image from "next/image"
import emailjs from "@emailjs/browser"

export default function FahrschulePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "services", "prices", "about", "reviews", "contact"]
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll("[data-animate]")
    animatedElements.forEach((el) => observer.observe(el))

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

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
      features: ["Theorieunterricht", "Praktische Fahrstunden", "Prüfungsvorbereitung"],
      icon: <Car className="h-8 w-8" />,
    },
    {
      title: "Intensivkurse",
      description: "Schnell zum Führerschein in wenigen Wochen",
      features: ["Kompakte Ausbildung", "Flexible Termine", "Individuelle Betreuung"],
      icon: <Clock className="h-8 w-8" />,
    },
    {
      title: "Auffrischungskurse",
      description: "Für Wiedereinsteiger und unsichere Fahrer",
      features: ["Vertrauensaufbau", "Moderne Fahrtechnik", "Stressfreies Lernen"],
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
        "service_vlwucww", // Your service ID
        "template_01z4p0s", // Your template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Fahrschule 06",
        },
        "cjQybvvQL-u64pwJ2", // Your public key
      )

      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Email send failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
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
          className="flex items-center justify-center w-14 h-14 bg-green-500/90 hover:bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/logo-blue.svg" alt="Fahrschule 06 Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-[#1351d8]">Fahrschule 06</h1>
                <p className="text-xs text-gray-600">fahrschule06.ch</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Services", "Preise", "Über uns", "Bewertungen", "Kontakt"].map((item, index) => {
                const sectionId = ["home", "services", "prices", "about", "reviews", "contact"][index]
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-sm font-medium transition-colors hover:text-[#1351d8] ${
                      activeSection === sectionId ? "text-[#1351d8]" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white"
              >
                Jetzt anmelden
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-[#1351d8]">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 top-16 bg-white z-60 overflow-y-auto">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {["Home", "Services", "Preise", "Über uns", "Bewertungen", "Kontakt"].map((item, index) => {
                  const sectionId = ["home", "services", "prices", "about", "reviews", "contact"][index]
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-[#1351d8] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  )
                })}
                <div className="pt-4">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-[#1351d8] hover:bg-[#1351d8]/90 text-lg py-3 text-white"
                  >
                    Jetzt anmelden
                  </Button>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col space-y-3">
                      <a
                        href="tel:+41763402201"
                        className="flex items-center space-x-3 text-[#1351d8] hover:text-[#1351d8]/80 font-medium transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <span>+41 76 340 22 01</span>
                      </a>
                      <a
                        href="https://wa.me/41763402201?text=Hallo%20Fahrschule%2006%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrausbildung."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 bg-green-500/90 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        <span>WhatsApp öffnen</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with subtle parallax */}
      <section id="home" className="relative pt-16 bg-gradient-to-br from-[#1351d8]/5 to-white overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up" data-animate="hero-content" id="hero-content">
              <div className="space-y-4">
                <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20">
                  Zürich's moderne Fahrschule
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Willkommen bei <span className="text-[#1351d8]">Fahrschule 06</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Ihre professionelle Fahrschule in Zürich. Mit modernen Fahrzeugen, erfahrenen Fahrlehrern und
                  individueller Betreuung bringen wir Sie sicher zum Führerschein.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-lg px-8 text-white"
                  onClick={() => scrollToSection("contact")}
                >
                  Jetzt anmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-[#1351d8] text-[#1351d8] hover:bg-[#1351d8]/5 bg-transparent"
                  onClick={() => scrollToSection("services")}
                >
                  Services entdecken
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1351d8]">300+</div>
                  <div className="text-sm text-gray-600">Erfolgreiche Schüler</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1351d8]">90%</div>
                  <div className="text-sm text-gray-600">Erfolgsquote</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1351d8]">3+</div>
                  <div className="text-sm text-gray-600">Jahre Erfahrung</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/hero-transparent.png"
                alt="Fahrschule 06 - Professioneller Fahrlehrer mit blauem Ford"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Dramatic Background */}
      <section id="services" className="relative py-20 overflow-hidden">
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
          {/* Statistics Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
            {/* Left side - Statistics */}
            <div className="text-white text-center lg:text-left">
              <div className="mb-8">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="text-[#1351d8]">90%</span> der Fahrschüler
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
                  bestehen die Fahrprüfung beim ersten Versuch
                </div>
                <Button
                  size="lg"
                  className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                  onClick={() => scrollToSection("contact")}
                >
                  MELDE DICH JETZT AN
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side - Visual Element */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Large circle background */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  {/* Inner content */}
                  <div className="text-center">
                    {/* Shield icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    {/* Car icon */}
                    <div className="w-12 h-6 sm:w-16 sm:h-8 bg-gradient-to-r from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Car className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#1351d8] rounded-full animate-pulse"></div>
                <div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
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
                      onClick={() => scrollToSection("contact")}
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

      {/* Prices Section */}
      <section id="prices" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">Unsere Preise</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Transparente Preisgestaltung</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparente Preise ohne versteckte Kosten. Wählen Sie das Paket, das am besten zu Ihnen passt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basis Paket */}
            <Card
              className={`relative border-2 border-gray-200 hover:border-[#1351d8]/30 transition-all duration-500 hover:scale-105 ${
                visibleElements.has("price-basic") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              data-animate="price-basic"
              id="price-basic"
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Basis Paket</CardTitle>
                <p className="text-gray-600 mb-6">Ideal für Einsteiger</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 1,200</span>
                  <span className="text-gray-600">.-</span>
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
                    <span className="text-gray-700">Theorieunterricht</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Lehrmaterial inklusive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsanmeldung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Grundausstattung</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
                    onClick={() => scrollToSection("contact")}
                  >
                    Paket wählen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Komfort Paket - Beliebt */}
            <Card
              className={`relative border-2 border-[#1351d8] hover:border-[#1351d8] transition-all duration-500 hover:scale-105 shadow-lg ${
                visibleElements.has("price-comfort") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              data-animate="price-comfort"
              id="price-comfort"
              style={{ animationDelay: "200ms" }}
            >
              {/* Beliebt Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#1351d8] text-white px-4 py-1 text-sm font-medium">⭐ Beliebt</Badge>
              </div>

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Komfort Paket</CardTitle>
                <p className="text-gray-600 mb-6">Unser beliebtestes Angebot</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 1,800</span>
                  <span className="text-gray-600">.-</span>
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
                    <span className="text-gray-700">Theorieunterricht</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Lehrmaterial inklusive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsanmeldung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsfahrt inklusive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Online-Lernplattform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Flexible Terminplanung</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-[#1351d8]/90 hover:bg-[#1351d8] text-white transition-colors duration-300"
                    onClick={() => scrollToSection("contact")}
                  >
                    Paket wählen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Premium Paket */}
            <Card
              className={`relative border-2 border-gray-200 hover:border-[#1351d8]/30 transition-all duration-500 hover:scale-105 ${
                visibleElements.has("price-premium") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              data-animate="price-premium"
              id="price-premium"
              style={{ animationDelay: "400ms" }}
            >
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Premium Paket</CardTitle>
                <p className="text-gray-600 mb-6">Rundum-sorglos-Paket</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1351d8]">CHF 2,500</span>
                  <span className="text-gray-600">.-</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">30 Fahrstunden à 45 Min</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Theorieunterricht</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Lehrmaterial inklusive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsanmeldung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Prüfungsfahrt inklusive</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Online-Lernplattform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Intensivbetreuung</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Erfolgsgarantie</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Zusätzliche Prüfung gratis</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
                    onClick={() => scrollToSection("contact")}
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
      <section id="about" className="py-20 bg-gradient-to-br from-[#1351d8]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20">Über uns</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Ihre Fahrschule in Zürich</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fahrschule 06 steht für moderne Fahrausbildung in Zürich. Mit unserem erfahrenen Team, modernen
                Fahrzeugen und individueller Betreuung bringen wir Sie sicher und entspannt zum Führerschein.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">Zertifizierte Fahrlehrer mit langjähriger Erfahrung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">Moderne Fahrzeuge mit neuester Sicherheitstechnik</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-[#1351d8]" />
                  <span className="text-gray-700">Individuelle Betreuung und flexible Terminplanung</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#1351d8]/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "300+", label: "Erfolgreiche Fahrschüler" },
                    { value: "90%", label: "Erfolgsquote bei Prüfungen" },
                    { value: "3+", label: "Jahre Erfahrung" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center transform transition-all duration-700 hover:scale-110 ${
                        visibleElements.has(`stat-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      data-animate={`stat-${index}`}
                      id={`stat-${index}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-3xl font-bold text-[#1351d8] mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elfsight Google Reviews Widget - Auto-collapsing container */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="elfsight-app-6c554cba-f50e-4e80-b00a-0be0c2847328" data-elfsight-app-lazy></div>
              {/* Overlay to hide the bottom "Free Google Reviews widget" text */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-white z-10"></div>
            </div>
          </div>

          {/* Action Buttons - Only show when widget is present */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#1351d8] hover:bg-[#1351d8]/90 text-white"
                onClick={() => window.open("https://maps.app.goo.gl/Mz2o7vcbSXpGn5WRA", "_blank")}
              >
                <Star className="mr-2 h-5 w-5" />
                Alle Bewertungen auf Google
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() =>
                  window.open(
                    "https://search.google.com/local/writereview?placeid=ChIJsofKEfEbUEcRsrLgKwIQ7rE",
                    "_blank",
                  )
                }
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Bewertung schreiben
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
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
                      <MapPin className="h-6 w-6 text-[#1351d8]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Adresse</div>
                      <div className="text-gray-600">
                        Bederstrasse 51
                        <br />
                        8002 Zürich, Schweiz
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
                      <div className="text-gray-600">
                        Mo-Fr: 08:00 - 20:00
                        <br />
                        Sa: 08:00 - 16:00
                        <br />
                        So: Nach Vereinbarung
                      </div>
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
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Vorname</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Ihr Vorname"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Nachname</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Ihr Nachname"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">E-Mail</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ihre.email@beispiel.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Telefon</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Nachricht</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Teilen Sie uns mit, wie wir Ihnen helfen können..."
                      rows={4}
                      required
                    />
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src="/logo.svg" alt="Fahrschule 06 Logo" width={32} height={32} className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-bold">Fahrschule 06</h3>
                  <p className="text-sm text-gray-400">fahrschule06.ch</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Ihre professionelle Fahrschule in Zürich für eine sichere und entspannte Fahrausbildung.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Kategorie B (Auto)</li>
                <li>Intensivkurse</li>
                <li>Auffrischungskurse</li>
                <li>Theorieunterricht</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+41 76 340 22 01</li>
                <li>Bederstrasse 51</li>
                <li>8002 Zürich</li>
                <li>fahrschule06.ch</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Öffnungszeiten</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Mo-Fr: 08:00 - 20:00</li>
                <li>Sa: 08:00 - 16:00</li>
                <li>So: Nach Vereinbarung</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Fahrschule 06. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
