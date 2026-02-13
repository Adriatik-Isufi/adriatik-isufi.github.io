import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fahrschule06.ch"),
  title: "Fahrschule 06 - Fahrausbildung in Aargau & Olten | Kat. B",
  description:
    "Fahrschule 06 – moderne Fahrausbildung in Aargau & Olten. Kat. B Fahrstunden, VKU und persönliche Betreuung. Jetzt Termin sichern!",
  keywords:
    "Fahrschule Aargau, Fahrschule Olten, Führerschein Aargau, Fahrstunden Olten, VKU Aargau, Fahrausbildung, Kategorie B, Fahrschule 06, Reitnau",
  authors: [{ name: "Fahrschule 06", url: "https://www.fahrschule06.ch" }],
  creator: "Fahrschule 06",
  publisher: "Fahrschule 06",
  generator: "Next.js",
  applicationName: "Fahrschule 06",
  referrer: "strict-origin-when-cross-origin",
  category: "Education",
  classification: "Driving School",
  openGraph: {
    title: "Fahrschule 06 - Führerschein Aargau/Olten",
    description:
      "Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer, flexible Termine.",
    type: "website",
    url: "https://www.fahrschule06.ch",
    locale: "de_CH",
    siteName: "Fahrschule 06",
    images: [
      {
        url: "/logo-blue.svg",
        width: 1200,
        height: 630,
        alt: "Fahrschule 06 Logo - Professionelle Fahrausbildung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahrschule 06 - Führerschein Aargau/Olten",
    description: "Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer.",
    images: ["/logo-blue.svg"],
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
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.fahrschule06.ch",
    languages: {
      "de-CH": "https://www.fahrschule06.ch",
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

        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="CH-AG" />
        <meta name="geo.placename" content="Aargau, Olten" />
        <meta name="geo.position" content="47.3769;8.2297" />
        <meta name="ICBM" content="47.3769, 8.2297" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="author" content="Fahrschule 06" />
        <meta name="coverage" content="Aargau, Olten, Switzerland" />
        <meta name="distribution" content="local" />
        <meta name="language" content="German" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subject" content="Driving Education and Training" />
        <meta name="topic" content="Driver's License Training in Aargau" />
        <meta name="abstract" content="Professional driving school in Aargau/Olten offering Category B license training, VKU courses, and practical driving lessons." />
        <meta name="directory" content="Business : Automotive : Driving Schools" />

        {/* Mobile Meta Tags */}
        <meta name="MobileOptimized" content="width" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fahrschule 06" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Dublin Core Meta Tags */}
        <meta name="DC.title" content="Fahrschule 06 - Führerschein Aargau/Olten" />
        <meta name="DC.creator" content="Fahrschule 06" />
        <meta name="DC.subject" content="Driving Education, Driver's License Training" />
        <meta name="DC.description" content="Professional driving school in Aargau/Olten offering comprehensive driver training." />
        <meta name="DC.publisher" content="Fahrschule 06" />
        <meta name="DC.contributor" content="Vaxhid Mustafa" />
        <meta name="DC.date" content="2025-02-06" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://www.fahrschule06.ch" />
        <meta name="DC.language" content="de-CH" />
        <meta name="DC.coverage" content="Aargau, Olten, Switzerland" />
        <meta name="DC.rights" content="Copyright 2025 Fahrschule 06. All rights reserved." />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://elfsightcdn.com" />

        {/* Canonical URL handled by Next.js metadata - removed duplicate manual tag */}

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

        {/* Enhanced Open Graph Tags */}
        <meta property="og:url" content="https://www.fahrschule06.ch" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fahrschule 06 - Führerschein Aargau/Olten" />
        <meta property="og:description" content="Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer, flexible Termine." />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="Fahrschule 06" />
        <meta property="og:image" content="https://www.fahrschule06.ch/logo-blue.svg" />
        <meta property="og:image:url" content="https://www.fahrschule06.ch/logo-blue.svg" />
        <meta property="og:image:secure_url" content="https://www.fahrschule06.ch/logo-blue.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fahrschule 06 - Professionelle Fahrausbildung" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:street-address" content="Oberdorf 4" />
        <meta property="og:locality" content="Reitnau" />
        <meta property="og:region" content="Aargau" />
        <meta property="og:postal-code" content="5057" />
        <meta property="og:country-name" content="Switzerland" />
        <meta property="og:email" content="info@fahrschule06.ch" />
        <meta property="og:phone_number" content="+41763402201" />
        <meta property="og:latitude" content="47.3769" />
        <meta property="og:longitude" content="8.2297" />

        {/* Enhanced Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fahrschule 06 - Führerschein Aargau/Olten" />
        <meta name="twitter:description" content="Professionelle Fahrausbildung in Aargau/Olten. Moderne Fahrzeuge, erfahrene Fahrlehrer, flexible Termine." />
        <meta name="twitter:image" content="https://www.fahrschule06.ch/logo-blue.svg" />
        <meta name="twitter:image:alt" content="Fahrschule 06 Logo" />
        <meta name="twitter:label1" content="Standort" />
        <meta name="twitter:data1" content="Aargau, Switzerland" />
        <meta name="twitter:label2" content="Bewertung" />
        <meta name="twitter:data2" content="5.0 ⭐ (22 Bewertungen)" />

        <script src="https://elfsightcdn.com/platform.js" async></script>

        {/* Enhanced JSON-LD Structured Data - DrivingSchool with Reviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.fahrschule06.ch#localbusiness",
              name: "Fahrschule 06",
              alternateName: "Fahrschule06",
              description: "Professionelle Fahrschule in Aargau/Olten für Führerschein Kategorie B, VKU und Fahrausbildung",
              url: "https://www.fahrschule06.ch",
              logo: "https://www.fahrschule06.ch/logo-blue.svg",
              image: "https://www.fahrschule06.ch/logo-blue.svg",
              telephone: "+41763402201",
              email: "info@fahrschule06.ch",
              priceRange: "$$",
              currenciesAccepted: "CHF",
              paymentAccepted: "Cash, Twint, Bank Transfer",
              slogan: "Deine professionelle Fahrschule in Aargau/Olten",
              foundingDate: "2020",
              knowsLanguage: ["de-CH", "de", "en"],
              hasMap: "https://maps.app.goo.gl/FQjm2ZRoo8V7TPxz9",
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
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "08:00",
                  closes: "20:00",
                },
              ],
              areaServed: [
                { "@type": "City", name: "Reitnau", containedInPlace: { "@type": "State", name: "Aargau" } },
                { "@type": "City", name: "Olten", containedInPlace: { "@type": "State", name: "Solothurn" } },
                { "@type": "City", name: "Aarau", containedInPlace: { "@type": "State", name: "Aargau" } },
                { "@type": "State", name: "Aargau", containedInPlace: { "@type": "Country", name: "Switzerland" } },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "22",
                reviewCount: "22",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Duena Basha" },
                  datePublished: "2025-02-04",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Er ist ein sehr guter Fahrlehrer. Er erklärt alles verständlich, ist nett, geduldig und man lernt viel bei ihm. Absolut empfehlenswert!",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Joshua Hottiger" },
                  datePublished: "2025-01-16",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Alles sehr gut erklärt, mit auch einer gewissen strenge. Was voll und ganz im normalen Bereich ist. Bin sehr zu frieden mit dem ganz Packet.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Gershan Ambikaipalan" },
                  datePublished: "2025-01-09",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Ich kenne zwar nicht viele Fahrlehrer, aber ich kann mit Überzeugung sagen, dass Vaxhid der beste Fahrlehrer ist, den man sich aussuchen kann.",
                },
              ],
              sameAs: [
                "https://www.facebook.com/vaxhid.mustafa",
                "https://www.instagram.com/fahrschule06/",
                "https://www.tiktok.com/@fahrschule_06",
                "https://www.linkedin.com/in/vaxhid-mustafa-ab8574210/",
              ],
            }),
          }}
        />

        {/* Service Schema - VKU */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "VKU - Verkehrskundeunterricht",
              provider: { "@id": "https://www.fahrschule06.ch#localbusiness" },
              areaServed: [
                { "@type": "State", name: "Aargau" },
                { "@type": "City", name: "Olten" },
              ],
              description: "Obligatorischer Verkehrskundeunterricht für den Führerschein Kategorie B",
            }),
          }}
        />

        {/* Service Schema - Fahrstunden */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Fahrstunden Kategorie B",
              provider: { "@id": "https://www.fahrschule06.ch#localbusiness" },
              areaServed: [
                { "@type": "State", name: "Aargau" },
                { "@type": "City", name: "Olten" },
              ],
              description: "Praktische Fahrstunden für Führerschein Kategorie B mit modernen Fahrzeugen",
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.fahrschule06.ch",
                },
              ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.fahrschule06.ch#organization",
              name: "Fahrschule 06",
              url: "https://www.fahrschule06.ch",
              logo: "https://www.fahrschule06.ch/logo-blue.svg",
              description: "Professionelle Fahrschule in Aargau/Olten",
              email: "info@fahrschule06.ch",
              telephone: "+41763402201",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Oberdorf 4",
                addressLocality: "Reitnau",
                postalCode: "5057",
                addressCountry: "CH",
                addressRegion: "Aargau",
              },
              sameAs: [
                "https://www.facebook.com/vaxhid.mustafa",
                "https://www.instagram.com/fahrschule06/",
                "https://www.tiktok.com/@fahrschule_06",
                "https://www.linkedin.com/in/vaxhid-mustafa-ab8574210/",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+41763402201",
                  contactType: "customer service",
                  email: "info@fahrschule06.ch",
                  areaServed: "CH",
                  availableLanguage: ["German", "English"],
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "08:00",
                    closes: "20:00",
                  },
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+41763402201",
                  contactType: "sales",
                  email: "info@fahrschule06.ch",
                  areaServed: "CH",
                  availableLanguage: ["German", "English"],
                },
              ],
            }),
          }}
        />

        {/* FAQPage Schema for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Was kostet der Führerschein bei Fahrschule 06?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Die Kosten hängen von der Anzahl der benötigten Fahrstunden oder dem gewählten Paket ab. Eine Fahrstunde (45 Min.) kostet CHF 85.–, der VKU-Kurs CHF 160.–, der Nothelferkurs CHF 120.– sowie eine einmalige Grundpauschale von CHF 100.–. Alternativ gibt es Pakete: das Basis-Paket mit 10 Fahrstunden für CHF 850.–, das Komfort-Paket mit 10 Fahrstunden, VKU und Anmeldung für CHF 950.– oder das Premium-Paket mit 20 Fahrstunden, VKU und Prüfungssimulation für CHF 1'790.–.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wie lange dauert die Fahrausbildung?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Die Dauer ist individuell – die meisten Fahrschüler benötigen zwischen 20 und 30 Fahrstunden. Wichtig: Gemäss Schweizer Gesetz müssen Fahrschüler im Alter von 17, 18 und 19 Jahren nach Erhalt des Lernfahrausweises mindestens 12 Monate warten, bevor sie zur praktischen Prüfung antreten dürfen. Ab 20 Jahren entfällt diese Wartefrist. Der VKU-Kurs dauert 8 Stunden und wird an 2 Abenden absolviert.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Was ist der VKU (Verkehrskundeunterricht)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Der Verkehrskundeunterricht (VKU) ist ein obligatorischer 8-stündiger Theoriekurs für alle Führerschein-Anwärter. Er behandelt Themen wie Verkehrssehen, Verkehrsumwelt, Verkehrsdynamik und Verkehrstaktik. Der VKU muss vor der praktischen Prüfung absolviert werden.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wo findet die Fahrausbildung statt?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Die Fahrausbildung findet im Raum Aargau und Olten statt. Wir holen dich gerne an deinem Wohnort, Arbeitsplatz oder Bahnhof ab. Der VKU-Kurs wird in Aarau durchgeführt. Die praktische Fahrprüfung findet beim Strassenverkehrsamt in Aarau oder Olten statt.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wie kann ich mich bei Fahrschule 06 anmelden?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Du kannst dich ganz einfach per WhatsApp, Telefon (+41 76 340 22 01) oder über das Kontaktformular auf der Website anmelden. Für die Anmeldung benötigst du einen gültigen Lernfahrausweis. Falls du noch keinen hast, helfen wir dir gerne bei den ersten Schritten.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Wo finde ich die Allgemeinen Geschäftsbedingungen (AGB)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Unsere AGB regeln alle wichtigen Punkte rund um die Fahrausbildung bei Fahrschule 06 – darunter Buchung und Bezahlung von Fahrstunden, Annullierungsbedingungen, VKU-Kursregelungen, Geschenkgutscheine sowie Datenschutz und Haftung. Wir empfehlen dir, die AGB vor Beginn der Ausbildung durchzulesen.",
                  },
                },
              ],
            }),
          }}
        />

        {/* SiteNavigationElement Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              name: "Hauptnavigation",
              url: "https://www.fahrschule06.ch",
              hasPart: [
                {
                  "@type": "SiteNavigationElement",
                  name: "Startseite",
                  url: "https://www.fahrschule06.ch#startseite",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Angebot",
                  url: "https://www.fahrschule06.ch#angebot",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Fahrlehrer",
                  url: "https://www.fahrschule06.ch#fahrlehrer",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Preise",
                  url: "https://www.fahrschule06.ch#preise",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Über uns",
                  url: "https://www.fahrschule06.ch#ueber-uns",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Bewertungen",
                  url: "https://www.fahrschule06.ch#bewertungen",
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Kontakt",
                  url: "https://www.fahrschule06.ch#kontakt",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
