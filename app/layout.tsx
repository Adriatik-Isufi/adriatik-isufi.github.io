import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fahrschule 06 - Führerschein Aargau/Olten | Professionelle Fahrausbildung",
  description:
    "Fahrschule 06: Deine professionelle Fahrschule in Aargau/Olten. Führerschein Kategorie B, VKU, Fahrstunden mit modernem Auto. Jetzt anmelden für deine Fahrausbildung!",
  keywords:
    "Fahrschule Aargau, Fahrschule Olten, Führerschein Aargau, Fahrstunden Olten, VKU Aargau, Fahrausbildung, Kategorie B, Fahrschule 06, Reitnau",
  generator: "Fahrschule 06 Website",
  openGraph: {
    title: "Fahrschule 06 - Führerschein Aargau/Olten",
    description:
      "Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer, flexible Termine.",
    type: "website",
    locale: "de_CH",
    siteName: "Fahrschule 06",
    images: [
      {
        url: "/logo-blue.svg",
        width: 1200,
        height: 630,
        alt: "Fahrschule 06 Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-blue.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-blue.svg",
    shortcut: "/favicon.ico",
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

        {/* Favicon and Icons - Comprehensive setup with correct attributes */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/logo-blue.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-blue.svg" />
        <link rel="mask-icon" href="/logo-blue.svg" color="#1351d8" />

        {/* Microsoft specific meta tags - FIXED: using 'content' instead of 'href' */}
        <meta name="theme-color" content="#1351d8" />
        <meta name="msapplication-TileColor" content="#1351d8" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional favicon sizes for better compatibility */}
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon.ico" />

        {/* Open Graph and Twitter Card images */}
        <meta property="og:image" content="/logo-blue.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fahrschule 06 - Professionelle Fahrausbildung" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/logo-blue.svg" />

        <script src="https://elfsightcdn.com/platform.js" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DrivingSchool",
              name: "Fahrschule 06",
              description: "Professionelle Fahrschule in Aargau/Olten für Führerschein Kategorie B",
              url: "https://fahrschule06.ch",
              logo: "https://fahrschule06.ch/logo-blue.svg",
              image: "https://fahrschule06.ch/logo-blue.svg",
              telephone: "+41763402201",
              email: "info@fahrschule06.ch",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Oberdorf 4",
                addressLocality: "Reitnau",
                postalCode: "5057",
                addressCountry: "CH",
                addressRegion: "Aargau",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "47.3769",
                longitude: "8.2297",
              },
              openingHours: ["Mo-Sa 08:00-20:00"],
              serviceArea: {
                "@type": "Place",
                name: "Aargau, Olten",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
