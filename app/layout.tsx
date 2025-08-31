import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fahrschule 06 - Führerschein Aargau/Olten | Professionelle Fahrausbildung",
  description:
    "Fahrschule 06: Deine professionelle Fahrschule in Aargau/Olten. Führerschein Kategorie B, VKU, Fahrstunden mit modernem Auto. Jetzt anmelden für deine Fahrausbildung!",
  keywords: "Fahrschule Aargau, Fahrschule Olten, Führerschein Aargau, Fahrstunden Olten, VKU Aargau, Fahrausbildung, Kategorie B, Fahrschule 06, Reitnau",
  generator: 'v0.app',
  openGraph: {
    title: "Fahrschule 06 - Führerschein Aargau/Olten",
    description: "Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer, flexible Termine.",
    type: "website",
    locale: "de_CH",
    siteName: "Fahrschule 06"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de-CH" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="CH-AG" />
        <meta name="geo.placename" content="Aargau, Olten" />
        <meta name="geo.position" content="47.3769;8.2297" />
        <meta name="ICBM" content="47.3769, 8.2297" />
        <link rel="canonical" href="https://fahrschule06.ch" />
        <script src="https://elfsightcdn.com/platform.js" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DrivingSchool",
              "name": "Fahrschule 06",
              "description": "Professionelle Fahrschule in Aargau/Olten für Führerschein Kategorie B",
              "url": "https://fahrschule06.ch",
              "telephone": "+41763402201",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Oberdorf 4",
                "addressLocality": "Reitnau",
                "postalCode": "5057",
                "addressCountry": "CH",
                "addressRegion": "Aargau"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "47.3769",
                "longitude": "8.2297"
              },
              "openingHours": [
                "Mo-Fr 08:00-20:00",
                "Sa 08:00-16:00"
              ],
              "serviceArea": {
                "@type": "Place",
                "name": "Aargau, Olten"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
