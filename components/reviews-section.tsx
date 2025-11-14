"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  const [mobileReviewIndex, setMobileReviewIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [truncatedReviews, setTruncatedReviews] = useState<Set<number>>(new Set())
  const reviewRefs = useRef<Map<number, HTMLParagraphElement>>(new Map())
  const reviewsPerPage = 3
  const reviews: Review[] = reviewsData.reviews
  const overallRating = reviewsData.overallRating
  const totalReviews = reviewsData.totalReviews
  const googleReviewsUrl = reviewsData.googleReviewsUrl
  const stories: Story[] = storiesData.stories
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const storyDuration = 5000 // 5 seconds per story

  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const startIndex = currentPage * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const currentReviews = reviews.slice(startIndex, endIndex)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && mobileReviewIndex < reviews.length - 1) {
      setMobileReviewIndex((prev) => prev + 1)
    }
    if (isRightSwipe && mobileReviewIndex > 0) {
      setMobileReviewIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (selectedStoryIndex === null || isHolding) return

    setProgress(0)
    const startTime = Date.now()

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed / storyDuration) * 100

      if (newProgress >= 100) {
        // Auto-advance to next story
        if (selectedStoryIndex < stories.length - 1) {
          setSelectedStoryIndex(selectedStoryIndex + 1)
        } else {
          // Close modal when all stories are done
          setSelectedStoryIndex(null)
        }
      } else {
        setProgress(newProgress)
      }
    }, 50)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [selectedStoryIndex, isHolding, stories.length])

  useEffect(() => {
    const checkTruncation = () => {
      const truncated = new Set<number>()
      
      reviewRefs.current.forEach((element, reviewId) => {
        if (!element) return
        
        // Create a clone to measure natural height
        const clone = element.cloneNode(true) as HTMLElement
        clone.style.display = 'block'
        clone.style.webkitLineClamp = 'unset'
        clone.style.position = 'absolute'
        clone.style.visibility = 'hidden'
        clone.style.width = `${element.offsetWidth}px` // Match original width
        
        // Append to body temporarily
        document.body.appendChild(clone)
        
        // Get the natural height
        const naturalHeight = clone.offsetHeight
        
        // Get the clamped height from the original element
        const clampedHeight = element.offsetHeight
        
        // Remove the clone
        document.body.removeChild(clone)
        
        // If natural height is greater than clamped height, it's truncated
        if (naturalHeight > clampedHeight) {
          truncated.add(reviewId)
        }
      })
      
      setTruncatedReviews(truncated)
    }

    // Wait for fonts and layout to be ready
    const timeoutId = setTimeout(checkTruncation, 150)
    
    // Recheck on window resize
    window.addEventListener('resize', checkTruncation)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', checkTruncation)
    }
  }, [currentPage, mobileReviewIndex])

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

  const selectedStory = selectedStoryIndex !== null ? stories[selectedStoryIndex] : null

  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8">
          <div className="text-center">
            <Badge className="bg-[#1351d8]/10 text-[#1351d8] border-[#1351d8]/20 mb-4">
              Bewertungen / Erfolgsgeschichten
            </Badge>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Was unsere Kunden sagen</h2>

            {stories.length > 0 && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <button onClick={() => setSelectedStoryIndex(0)} className="group relative">
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 -rotate-90 animate-pulse-ring" viewBox="0 0 100 100">
                    {stories.map((_, index) => {
                      const segmentAngle = 360 / stories.length
                      const startAngle = index * segmentAngle
                      const circumference = 2 * Math.PI * 42
                      const segmentLength = circumference / stories.length
                      const gap = 4 // Increased gap between segments for clearer separation

                      return (
                        <circle
                          key={index}
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="5"
                          strokeDasharray={`${segmentLength - gap} ${circumference - (segmentLength - gap)}`}
                          strokeDashoffset={-(index * segmentLength + circumference / 4)}
                          className="transition-all duration-300"
                        />
                      )
                    })}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1351d8" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-[4.75rem] sm:h-[4.75rem] rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={stories[0].image || "/placeholder.svg"}
                        alt="Success Stories"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </button>

                {stories.length > 1 && (
                  <span className="text-sm font-semibold text-[#1351d8]">+{stories.length - 1}</span>
                )}
              </div>
            )}

            <p className="text-xl text-gray-600 mb-8">Lesen Sie die Erfahrungen unserer zufriedenen Fahrschüler</p>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google Bewertungen</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-5xl font-bold text-[#1351d8]">{overallRating.toFixed(1)}</span>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#1351d8] text-[#1351d8]" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Basierend auf {totalReviews} Bewertungen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedReview && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReview(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedReview(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">{selectedReview.avatar}</span>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{selectedReview.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < selectedReview.rating ? "fill-[#1351d8] text-[#1351d8]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{selectedReview.date}</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-left whitespace-pre-wrap">{selectedReview.text}</p>
            </div>
          </div>
        )}

        {selectedStory && selectedStoryIndex !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
              {stories.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: index < selectedStoryIndex ? "100%" : index === selectedStoryIndex ? `${progress}%` : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={() => setSelectedStoryIndex(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="max-w-lg w-full h-full flex items-center relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-1/2 z-[5] touch-none"
                onMouseDown={handleHoldStart}
                onMouseUp={(e) => handleHoldEnd(e, "left")}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={(e) => handleHoldEnd(e, "left")}
              />

              <div
                className="absolute right-0 top-0 bottom-0 w-1/2 z-[5] touch-none"
                onMouseDown={handleHoldStart}
                onMouseUp={(e) => handleHoldEnd(e, "right")}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={(e) => handleHoldEnd(e, "right")}
              />

              <div className="w-full px-4">
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

                <div className="relative rounded-lg overflow-hidden bg-gray-900">
                  <img
                    src={selectedStory.image || "/placeholder.svg"}
                    alt={selectedStory.caption}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white text-lg font-medium">{selectedStory.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <div
            className="md:hidden mb-8 relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${mobileReviewIndex * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    <Card className="border border-gray-200 hover:border-[#1351d8]/30 transition-all duration-300 hover:shadow-lg h-[280px] flex flex-col">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">{review.avatar}</span>
                          </div>

                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900 mb-1 text-left">{review.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-[#1351d8] text-[#1351d8]" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 text-left">{review.date}</p>
                          </div>
                        </div>

                        <div className="flex-1 overflow-hidden">
                          <p
                            ref={(el) => {
                              if (el) reviewRefs.current.set(review.id, el)
                            }}
                            className="text-gray-600 leading-relaxed text-left line-clamp-4"
                          >
                            {review.text}
                          </p>
                        </div>

                        {truncatedReviews.has(review.id) && (
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="text-[#1351d8] text-sm font-medium hover:underline mt-2 text-left"
                          >
                            mehr lesen...
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 mt-4">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileReviewIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === mobileReviewIndex ? "bg-[#1351d8] w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review) => (
              <Card
                key={review.id}
                className="border border-gray-200 hover:border-[#1351d8]/30 transition-all duration-300 hover:shadow-lg h-[280px] flex flex-col"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1351d8] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{review.avatar}</span>
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 mb-1 text-left">{review.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#1351d8] text-[#1351d8]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-left">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p
                      ref={(el) => {
                        if (el) reviewRefs.current.set(review.id, el)
                      }}
                      className="text-gray-600 leading-relaxed text-left line-clamp-4"
                    >
                      {review.text}
                    </p>
                  </div>

                  {truncatedReviews.has(review.id) && (
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="text-[#1351d8] text-sm font-medium hover:underline mt-2 text-left"
                    >
                      mehr lesen...
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="hidden md:flex items-center justify-center space-x-4 mb-8">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white shadow-lg"
              onClick={() => window.open(googleReviewsUrl, "_blank")}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Alle Bewertungen auf Google ansehen
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/5 bg-transparent shadow-lg"
              onClick={() => {
                const reviewTemplate =
                  "Ich war sehr zufrieden mit Fahrschule 06! Vaxhid ist ein geduldiger und professioneller Fahrlehrer. Die Fahrstunden waren gut strukturiert und ich habe mich immer sicher gefühlt. Kann ich nur weiterempfehlen! ⭐⭐⭐⭐⭐"
                const encodedReview = encodeURIComponent(reviewTemplate)
                window.open(`https://maps.app.goo.gl/FQjm2ZRoo8V7TPxz9?review=${encodedReview}`, "_blank")
              }}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google Bewertung schreiben
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
