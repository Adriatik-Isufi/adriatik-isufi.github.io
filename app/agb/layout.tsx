import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AGB - Fahrschule 06 | Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen der Fahrschule 06 in Reitnau, Aargau. Informationen zu Fahrunterricht, VKU-Kursen, Zahlungsbedingungen und mehr.",
  robots: {
    index: true,
    follow: true,
    noarchive: false,
  },
  openGraph: {
    title: "AGB - Fahrschule 06",
    description: "Allgemeine Geschäftsbedingungen der Fahrschule 06 in Reitnau, Aargau.",
    url: "https://www.fahrschule06.ch/agb",
    type: "website",
    locale: "de_CH",
  },
  twitter: {
    card: "summary",
    title: "AGB - Fahrschule 06",
    description: "Allgemeine Geschäftsbedingungen der Fahrschule 06.",
  },
  alternates: {
    canonical: "https://www.fahrschule06.ch/agb",
  },
}

export default function AGBLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
