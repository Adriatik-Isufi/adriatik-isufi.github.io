"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu, X, Phone, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AGBPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSidebarSection, setActiveSidebarSection] = useState("navigation")

  const sections = [
    { id: "allgemein", label: "Allgemeines" },
    { id: "fahrunterricht", label: "Fahrunterricht" },
    { id: "gewaehrleistung", label: "Gewährleistung" },
    { id: "lektionsdauer", label: "Lektionsdauer" },
    { id: "lernfahrausweis", label: "Lernfahrausweis" },
    { id: "terminbuchungen", label: "Terminbuchungen" },
    { id: "kontrollfahrten", label: "Kontrollfahrten" },
    { id: "abmeldungen", label: "Abmeldungen & Verspätungen" },
    { id: "alkohol", label: "Alkohol, Medikamente & Drogen" },
    { id: "fahrzeuge", label: "Fahrzeuge" },
    { id: "versicherung-admin", label: "Versicherungs- & Adminpauschale" },
    { id: "preise", label: "Preise" },
    { id: "pruefung", label: "Praktische Prüfung" },
    { id: "zahlungsbedingungen", label: "Zahlungsbedingungen" },
    { id: "kurse", label: "Kurse & Veranstaltungen (VKU)" },
    { id: "gruppengroesse", label: "Gruppengrösse" },
    { id: "kurs-anmeldung", label: "Kursanmeldung" },
    { id: "kurs-umbuchung", label: "Umbuchung & Stornierung" },
    { id: "kurs-versaeumnis", label: "Versäumte Kursteile" },
    { id: "kursbestaetigung", label: "Kursbestätigung" },
    { id: "ausschluss", label: "Ausschluss" },
    { id: "kursgeld", label: "Kursgeld / Bezahlung" },
    { id: "kursorganisation", label: "Organisatorisches" },
    { id: "geschenkgutscheine", label: "Geschenkgutscheine" },
    { id: "datenschutz", label: "Datenschutz" },
    { id: "copyright", label: "Copyright" },
    { id: "gerichtsstand", label: "Gerichtsstand" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo-blue.svg" alt="Fahrschule 06 Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-[#1351d8]">Fahrschule 06</h1>
                <p className="text-xs text-gray-600">fahrschule06.ch</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Startseite
              </Link>
              <Link href="/#angebot" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Angebot
              </Link>
              <Link href="/#preise" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Preise
              </Link>
              <Link href="/#ueber-uns" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
                Über uns
              </Link>
              <Link href="/#kontakt" className="text-sm font-medium text-gray-700 hover:text-[#1351d8] transition-colors">
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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              className="md:hidden fixed inset-0 top-16 bg-white shadow-lg border-t border-gray-200 overflow-hidden flex"
              style={{ zIndex: 60, height: "calc(100vh - 4rem)" }}
            >
              <div className="w-20 bg-[#1351d8] flex flex-col">
                <button
                  onClick={() => setActiveSidebarSection("navigation")}
                  className={`flex-1 flex flex-col items-center justify-center py-8 text-white transition-all duration-300 relative ${
                    activeSidebarSection === "navigation" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap tracking-widest">Navigation</span>
                  {activeSidebarSection === "navigation" && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#1351d8] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setActiveSidebarSection("legal")}
                  className={`flex-1 flex flex-col items-center justify-center py-8 text-white transition-all duration-300 relative ${
                    activeSidebarSection === "legal" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-xs font-medium transform -rotate-90 whitespace-nowrap tracking-widest">Rechtliches</span>
                  {activeSidebarSection === "legal" && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#1351d8] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-white">
                <div className="px-6 pb-6">
                  {activeSidebarSection === "navigation" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Navigation</h3>
                      <div className="space-y-3">
                        <Link href="/" className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20">
                          Startseite
                        </Link>
                        <Link href="/#angebot" className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20">
                          Angebot
                        </Link>
                        <Link href="/#preise" className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20">
                          Preise
                        </Link>
                        <Link href="/#kontakt" className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20">
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
                        <a href="tel:+41763402201" className="flex items-center gap-3 text-[#1351d8] hover:text-[#1351d8]/80 transition-colors p-3 rounded-lg hover:bg-blue-50">
                          <Phone className="w-5 h-5" />
                          <span className="font-medium">+41 76 340 22 01</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {activeSidebarSection === "legal" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-8 mt-4">Rechtliches</h3>
                      <div className="space-y-3">
                        <Link href="/impressum" className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-[#1351d8]/20">
                          Impressum
                        </Link>
                        <Link href="/agb" className="block w-full text-left px-4 py-3 text-base font-medium text-[#1351d8] bg-blue-50 rounded-lg transition-colors border border-[#1351d8]/20">
                          AGB
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#1351d8] hover:text-[#1351d8]/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Zurück zur Startseite</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="text-gray-600">Stand: 01.01.2026</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar Table of Contents - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Inhaltsverzeichnis</h3>
              <nav className="space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#1351d8] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-gray max-w-none">
              {/* Intro */}
              <section id="allgemein" className="mb-12 scroll-mt-24">
                <p className="text-gray-700 leading-relaxed">
                  Die allgemeinen Geschäftsbedingungen (AGB) gelten für die Dienstleistungen der Fahrschule 06 (nachfolgend &quot;Fahrschule 06&quot;). Der Vertrag tritt bei Anmeldung (mündlich, telefonisch oder online) von durch Kunden gebuchte Leistungen in Kraft.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Der Einfachheit halber wird im gesamten Text die männliche Form verwendet; die weibliche Form ist selbstverständlich eingeschlossen.
                </p>
              </section>

              {/* Fahrunterricht */}
              <section id="fahrunterricht" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#1351d8]/20">Fahrunterricht</h2>
              </section>

              {/* Gewährleistung */}
              <section id="gewaehrleistung" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gewährleistung</h3>
                <p className="text-gray-700 leading-relaxed">
                  Der Fahrlehrer gewährleistet dem Fahrschüler einen professionellen, sicheren und qualitativ hochwertigen Fahrunterricht. Er hält sich an die gesetzlichen Vorschriften und Richtlinien für die Fahrausbildung und sorgt dafür, dass der Fahrschüler bestmöglich auf die praktische Führerprüfung vorbereitet wird.
                </p>
              </section>

              {/* Lektionsdauer */}
              <section id="lektionsdauer" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lektionsdauer</h3>
                <p className="text-gray-700 leading-relaxed">
                  Eine Fahrlektion dauert in der Regel 45 Minuten. Die Lektion beinhaltet die Begrüssung, Fahrtbesprechung und das Fahren. Die genaue Dauer wird bei der Buchung mitgeteilt. Doppellektionen (90 Minuten) sind ebenfalls möglich und werden entsprechend verrechnet.
                </p>
              </section>

              {/* Lernfahrausweis */}
              <section id="lernfahrausweis" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lernfahrausweis</h3>
                <p className="text-gray-700 leading-relaxed">
                  Der Fahrschüler muss im Besitz eines gültigen Lernfahrausweises sein. Ohne gültigen Lernfahrausweis darf keine Fahrlektion durchgeführt werden. Der Fahrschüler ist verpflichtet, den Lernfahrausweis bei jeder Fahrlektion mitzuführen und auf Verlangen vorzuweisen. Wird der Lernfahrausweis vergessen, kann die Lektion nicht stattfinden und wird dennoch vollumfänglich verrechnet.
                </p>
              </section>

              {/* Terminbuchungen */}
              <section id="terminbuchungen" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Terminbuchungen</h3>
                <p className="text-gray-700 leading-relaxed">
                  Fahrlektionen können telefonisch, per WhatsApp oder online gebucht werden. Die Buchung ist verbindlich. Der Fahrschüler erhält eine Bestätigung über den vereinbarten Termin. Fahrschule 06 behält sich das Recht vor, Termine bei Bedarf und nach Absprache mit dem Fahrschüler zu verschieben.
                </p>
              </section>

              {/* Kontrollfahrten */}
              <section id="kontrollfahrten" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontrollfahrten</h3>
                <p className="text-gray-700 leading-relaxed">
                  Kontrollfahrten werden für Personen angeboten, die im Besitz eines ausländischen Führerausweises sind und eine Kontrollfahrt absolvieren müssen. Die Kontrollfahrt wird individuell vereinbart und vorbereitet. Es gelten die gleichen Bedingungen wie für reguläre Fahrlektionen bezüglich Absage und Bezahlung.
                </p>
              </section>

              {/* Abmeldungen */}
              <section id="abmeldungen" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Abmeldungen, Verspätungen und Absenzen bei Fahrlektionen und Prüfungen</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Absagen von Fahrlektionen müssen mindestens <strong>48 Stunden</strong> (2 Arbeitstage) vor dem vereinbarten Termin erfolgen. Bei verspäteter Absage oder Nichterscheinen wird die Lektion vollumfänglich verrechnet.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Absagen sind telefonisch, per WhatsApp oder E-Mail möglich.</li>
                  <li>Bei Verspätung des Fahrschülers wird die verlorene Zeit nicht nachgeholt. Die Lektion endet zum ursprünglich geplanten Zeitpunkt.</li>
                  <li>Absagen von Prüfungsterminen müssen ebenfalls rechtzeitig erfolgen. Kosten, die durch verspätete Abmeldung bei der Prüfungsbehörde entstehen, gehen zu Lasten des Fahrschülers.</li>
                  <li>In Ausnahmefällen (z.B. Krankheit mit ärztlichem Attest) kann eine kulante Regelung getroffen werden.</li>
                </ul>
              </section>

              {/* Alkohol */}
              <section id="alkohol" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Alkohol, Medikamente und Drogen</h3>
                <p className="text-gray-700 leading-relaxed">
                  Der Fahrschüler darf weder unter Einfluss von Alkohol, Drogen noch von Medikamenten, die die Fahrfähigkeit beeinträchtigen, zur Fahrlektion erscheinen. Wird festgestellt, dass der Fahrschüler unter dem Einfluss solcher Substanzen steht, wird die Lektion sofort abgebrochen und vollumfänglich verrechnet. In schwerwiegenden Fällen behält sich Fahrschule 06 das Recht vor, den Fahrschüler von weiteren Lektionen auszuschliessen und die zuständigen Behörden zu informieren.
                </p>
              </section>

              {/* Fahrzeuge */}
              <section id="fahrzeuge" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fahrzeuge</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Fahrlektionen werden mit dem Fahrzeug der Fahrschule 06 durchgeführt. Der Fahrschüler hat das Fahrzeug sorgfältig zu behandeln. Bei grob fahrlässiger oder vorsätzlicher Beschädigung des Fahrzeuges haftet der Fahrschüler für den entstandenen Schaden. Das Rauchen im Fahrzeug ist nicht gestattet.
                </p>
              </section>

              {/* Versicherungs- und Adminpauschale */}
              <section id="versicherung-admin" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Versicherungs- und Adminpauschale bei Fahrlektionen (Kat. B)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Bei Fahrlektionen der Kategorie B kann eine Versicherungs- und Administrationspauschale erhoben werden. Diese deckt die Kosten für die Versicherung des Fahrschulfahrzeugs während der Lektionen sowie administrative Aufwendungen. Die Höhe der Pauschale wird bei Ausbildungsbeginn mitgeteilt.
                </p>
              </section>

              {/* Preise */}
              <section id="preise" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die aktuellen Preise sind auf der Webseite von Fahrschule 06 einsehbar oder werden auf Anfrage mitgeteilt. Preisänderungen bleiben vorbehalten und werden rechtzeitig kommuniziert. Bestehende Buchungen und Pakete sind von Preisänderungen nicht betroffen.
                </p>
              </section>

              {/* Praktische Prüfung */}
              <section id="pruefung" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Praktische Prüfung und Anmeldung</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die Anmeldung zur praktischen Führerprüfung erfolgt in Absprache zwischen dem Fahrlehrer und dem Fahrschüler. Der Fahrlehrer meldet den Schüler erst an, wenn dieser nach seiner fachlichen Einschätzung prüfungsreif ist.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Die Prüfungsgebühren des Strassenverkehrsamtes werden vom Fahrschüler direkt bezahlt.</li>
                  <li>Für die Prüfungsfahrt mit dem Fahrschulfahrzeug kann eine separate Gebühr erhoben werden.</li>
                  <li>Bei Nichtbestehen der Prüfung können weitere Lektionen und eine erneute Anmeldung erforderlich sein.</li>
                </ul>
              </section>

              {/* Zahlungsbedingungen */}
              <section id="zahlungsbedingungen" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Zahlungsbedingungen</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die Bezahlung der Fahrlektionen erfolgt direkt nach der Lektion oder gemäss Vereinbarung. Folgende Zahlungsmethoden werden akzeptiert:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Barzahlung</li>
                  <li>Banküberweisung (TWINT)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Bei Paketen oder Kursen ist die Bezahlung vor Beginn der Ausbildung fällig, sofern nicht anders vereinbart. Bei Zahlungsverzug behält sich Fahrschule 06 das Recht vor, weitere Lektionen zu verweigern und Mahngebühren zu erheben.
                </p>
              </section>

              {/* Kurse und Veranstaltungen */}
              <section id="kurse" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#1351d8]/20">Kurse und Veranstaltungen (VKU)</h2>
                <p className="text-gray-700 leading-relaxed">
                  Die nachfolgenden Bestimmungen gelten für den Verkehrskundeunterricht (VKU) sowie allfällige weitere Kurse und Veranstaltungen der Fahrschule 06.
                </p>
              </section>

              {/* Gruppengrösse */}
              <section id="gruppengroesse" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gruppengrösse</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Gruppengrösse für VKU-Kurse ist begrenzt, um eine hohe Unterrichtsqualität zu gewährleisten. Die maximale Teilnehmerzahl wird je nach Kurs festgelegt. Fahrschule 06 behält sich das Recht vor, Kurse bei ungenügender Teilnehmerzahl zu verschieben oder abzusagen.
                </p>
              </section>

              {/* Kursanmeldung */}
              <section id="kurs-anmeldung" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Anmeldung</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Anmeldung zu Kursen erfolgt telefonisch, per WhatsApp, E-Mail oder über die Webseite. Mit der Anmeldung anerkennt der Teilnehmer diese AGB. Die Anmeldung ist verbindlich und verpflichtet zur Bezahlung des Kursgeldes.
                </p>
              </section>

              {/* Umbuchung & Stornierung */}
              <section id="kurs-umbuchung" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Umbuchung, Stornierung und Versäumnis von Kursen</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Umbuchungen sind kostenlos möglich, sofern sie mindestens <strong>7 Tage</strong> vor Kursbeginn erfolgen.</li>
                  <li>Stornierungen bis 7 Tage vor Kursbeginn: Volle Rückerstattung abzüglich einer Bearbeitungsgebühr von CHF 50.-.</li>
                  <li>Stornierungen weniger als 7 Tage vor Kursbeginn: Keine Rückerstattung.</li>
                  <li>Bei Nichterscheinen ohne Abmeldung wird das volle Kursgeld geschuldet.</li>
                </ul>
              </section>

              {/* Versäumte Kursteile */}
              <section id="kurs-versaeumnis" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Versäumte Kursteile</h3>
                <p className="text-gray-700 leading-relaxed">
                  Versäumte Kursteile (z.B. einzelne VKU-Abende) können nach Absprache in einem nächsten Kurs nachgeholt werden, sofern Plätze verfügbar sind. Ein Anspruch auf Nachholen besteht nicht. Es können zusätzliche Kosten anfallen.
                </p>
              </section>

              {/* Kursbestätigung */}
              <section id="kursbestaetigung" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kursbestätigung</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nach erfolgreichem Abschluss des VKU-Kurses erhält der Teilnehmer eine Kursbestätigung. Diese wird vom Fahrlehrer direkt ausgestellt. Die Kursbestätigung ist Voraussetzung für die Anmeldung zur praktischen Führerprüfung.
                </p>
              </section>

              {/* Ausschluss */}
              <section id="ausschluss" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ausschluss</h3>
                <p className="text-gray-700 leading-relaxed">
                  Fahrschule 06 behält sich das Recht vor, Teilnehmer bei störendem Verhalten, unter Einfluss von Alkohol, Drogen oder Medikamenten oder bei wiederholtem Verstoss gegen die Kursregeln vom Kurs auszuschliessen. Bei einem Ausschluss besteht kein Anspruch auf Rückerstattung des Kursgeldes.
                </p>
              </section>

              {/* Kursgeld */}
              <section id="kursgeld" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Kursgeld / Bezahlung</h3>
                <p className="text-gray-700 leading-relaxed">
                  Das Kursgeld ist vor Kursbeginn zu bezahlen, sofern nicht anders vereinbart. Die Bezahlung kann bar, per Banküberweisung oder TWINT erfolgen. Bei Zahlungsverzug kann die Teilnahme am Kurs verweigert werden.
                </p>
              </section>

              {/* Organisatorisches */}
              <section id="kursorganisation" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Organisatorisches und Kursabsage durch Veranstalter</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Fahrschule 06 behält sich das Recht vor, Kurse bei ungenügender Teilnehmerzahl oder aus anderen triftigen Gründen abzusagen oder zu verschieben. In diesem Fall werden die Teilnehmer rechtzeitig informiert und erhalten eine volle Rückerstattung des Kursgeldes oder die Möglichkeit, an einem Ersatztermin teilzunehmen.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Die Kurssprache ist Deutsch. Kursunterlagen werden in deutscher Sprache abgegeben.
                </p>
              </section>

              {/* Geschenkgutscheine */}
              <section id="geschenkgutscheine" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#1351d8]/20">Geschenkgutscheine</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Geschenkgutscheine der Fahrschule 06 sind ab Ausstellungsdatum 12 Monate gültig. Der Gutschein ist nicht übertragbar und kann nicht gegen Bargeld eingelöst werden.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Gutscheine können für Fahrlektionen und VKU-Kurse eingelöst werden.</li>
                  <li>Ein allfälliger Restbetrag bleibt als Guthaben bestehen und kann für weitere Leistungen verwendet werden.</li>
                  <li>Verlorene Gutscheine werden nicht ersetzt.</li>
                </ul>
              </section>

              {/* Schlussbestimmungen */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#1351d8]/20">Schlussbestimmungen</h2>
              </section>

              {/* Datenschutz */}
              <section id="datenschutz" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Datenschutz</h3>
                <p className="text-gray-700 leading-relaxed">
                  Fahrschule 06 behandelt personenbezogene Daten vertraulich und gemäss den geltenden Datenschutzbestimmungen der Schweiz (nDSG). Die erhobenen Daten werden ausschliesslich für die Durchführung der gebuchten Dienstleistungen verwendet und nicht ohne Einwilligung an Dritte weitergegeben. Der Fahrschüler hat jederzeit das Recht, Auskunft über seine gespeicherten Daten zu verlangen und deren Löschung zu beantragen.
                </p>
              </section>

              {/* Copyright */}
              <section id="copyright" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Copyright</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sämtliche Inhalte der Webseite von Fahrschule 06 (Texte, Bilder, Grafiken, Videos etc.) sind urheberrechtlich geschützt. Jede Verwendung ausserhalb der engen Grenzen des Urheberrechtsgesetzes ist ohne Zustimmung von Fahrschule 06 unzulässig.
                </p>
              </section>

              {/* Gerichtsstand */}
              <section id="gerichtsstand" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gerichtsstand</h3>
                <p className="text-gray-700 leading-relaxed">
                  Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist der Wohnsitz des Beklagten oder der Sitz der Fahrschule 06 in Reitnau, Kanton Aargau.
                </p>
              </section>

              {/* Footer note */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Mit der Buchung einer Dienstleistung bei Fahrschule 06 akzeptiert der Kunde diese Allgemeinen Geschäftsbedingungen.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">&copy; 2026 Fahrschule 06. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-sm text-gray-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/agb" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
