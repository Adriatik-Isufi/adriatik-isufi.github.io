"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react"
import reviewsData from "@/data/reviews.json"
import storiesData from "@/data/stories.json"

interface Review {
  id: number
  name: string
  rating: number
  date: string
  text: string
  avatar: string
}

interface Story {
  id: number
  name: string
  image: string
  caption: string
  date: string
}

export function ReviewsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const reviewsPerPage = 3
  const reviews: Review[] = reviewsData.reviews
  const googleReviewsUrl = reviewsData.googleReviewsUrl

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const startIndex = currentPage * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const currentReviews = reviews.slice(startIndex, endIndex)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8">
          <div className="text-center">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">
              Bewertungen / Erfolgsgeschichten
            </Badge>
            
            {/* Header with Story Circle */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Was unsere Kunden sagen</h2>
              
              {/* Stories Circle - Positioned close to header text */}
              {storiesData.stories.length > 0 && (
                <div className="flex items-center">
                  {storiesData.stories.map((story) => (
                    <button
                      key={story.id}
                      onClick={() => setSelectedStory(story)}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1351d8] via-blue-500 to-cyan-400 rounded-full p-[2px] animate-pulse">
                          <div className="bg-white rounded-full p-[2px] w-full h-full">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                              <img
                                src={story.image || "/placeholder.svg"}
                                alt={story.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-12 h-12 lg:w-14 lg:h-14" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-xl text-gray-600 mb-8">Lesen Sie die Erfahrungen unserer zufriedenen Fahrschüler</p>

            {/* Rating Summary with Google Branding */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {/* Google Logo */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google Bewertungen</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-5xl font-bold text-[#1351d8]">{averageRating}</span>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#1351d8] text-[#1351d8]" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Basierend auf {reviews.length} Bewertungen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Modal */}
        {selectedStory && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setSelectedStory(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              {/* Story Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {selectedStory.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{selectedStory.name}</p>
                  <p className="text-gray-400 text-sm">{new Date(selectedStory.date).toLocaleDateString("de-CH")}</p>
                </div>
              </div>

              {/* Story Image */}
              <div className="relative rounded-lg overflow-hidden bg-gray-900">
                <img
                  src={selectedStory.image || "/placeholder.svg"}
                  alt={selectedStory.caption}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-lg font-medium">{selectedStory.caption}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          {/* Reviews Grid - Centered for 2 reviews */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {currentReviews.map((review) => (
                <Card
                  key={review.id}
                  className="border border-gray-200 hover:border-[#1351d8]/30 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">{review.avatar}</span>
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900 mb-1 text-left">{review.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-[#1351d8] text-[#1351d8]" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-left">{formatDate(review.date)}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-left">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                className="border-[#1351d8] text-[#1351d8] hover:bg-[#1351d8]/5 bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentPage ? "bg-[#1351d8] w-8" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                className="border-[#1351d8] text-[#1351d8] hover:bg-[#1351d8]/5 bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* CTA Buttons with Google Branding */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white shadow-lg"
              onClick={() => window.open(googleReviewsUrl, "_blank")}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Alle Bewertungen auf Google ansehen
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/5 bg-transparent shadow-lg"
              onClick={() => {
                const reviewTemplate = "Ich war sehr zufrieden mit Fahrschule 06! Vaxhid ist ein geduldiger und professioneller Fahrlehrer. Die Fahrstunden waren gut strukturiert und ich habe mich immer sicher gefühlt. Kann ich nur weiterempfehlen! ⭐⭐⭐⭐⭐"
                const encodedReview = encodeURIComponent(reviewTemplate)
                window.open(`https://maps.app.goo.gl/FQjm2ZRoo8V7TPxz9?review=${encodedReview}`, "_blank")
              }}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Bewertung schreiben
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
