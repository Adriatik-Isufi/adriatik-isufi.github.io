import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum - Fahrschule 06 | Rechtliche Informationen",
  description:
    "Rechtliche Informationen und Kontaktdaten der Fahrschule 06 in Reitnau, Aargau. Inhaber: Vaxhid Mustafa.",
  robots: {
    index: true,
    follow: true,
    noarchive: false,
  },
  openGraph: {
    title: "Impressum - Fahrschule 06",
    description: "Rechtliche Informationen und Kontaktdaten der Fahrschule 06 in Reitnau, Aargau.",
    url: "https://www.fahrschule06.ch/impressum",
    type: "website",
    locale: "de_CH",
  },
  twitter: {
    card: "summary",
    title: "Impressum - Fahrschule 06",
    description: "Rechtliche Informationen und Kontaktdaten der Fahrschule 06.",
  },
  alternates: {
    canonical: "https://www.fahrschule06.ch/impressum",
  },
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
