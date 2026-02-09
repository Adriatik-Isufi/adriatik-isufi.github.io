import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Image
          src="/logo-blue.svg"
          alt="Fahrschule 06 Logo"
          width={80}
          height={80}
          className="mx-auto mb-8"
        />

        <h1 className="text-6xl font-bold text-[#1351d8] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-gray-600 mb-8">
          Die angeforderte Seite existiert leider nicht. Vielleicht finden Sie, was Sie suchen, auf unserer Startseite.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1351d8] text-white font-medium rounded-xl hover:bg-[#1351d8]/90 transition-colors"
          >
            Zur Startseite
          </Link>
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#1351d8] text-[#1351d8] font-medium rounded-xl hover:bg-[#1351d8]/5 transition-colors"
          >
            Kontakt aufnehmen
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Oder rufen Sie uns direkt an:</p>
          <a
            href="tel:+41763402201"
            className="text-[#1351d8] font-medium hover:underline"
          >
            +41 76 340 22 01
          </a>
        </div>
      </div>
    </div>
  )
}
