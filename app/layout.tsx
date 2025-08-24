import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fahrschule 06 - Ihre Fahrschule in Zürich | fahrschule06.ch",
  description:
    "Professionelle Fahrausbildung in Zürich. Moderne Fahrzeuge, erfahrene Fahrlehrer und individuelle Betreuung. Jetzt anmelden bei Fahrschule 06!",
  keywords: "Fahrschule Zürich, Führerschein, Fahrausbildung, Fahrstunden, Theorieunterricht, Fahrschule 06",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <script src="https://elfsightcdn.com/platform.js" async></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
