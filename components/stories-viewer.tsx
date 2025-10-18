"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import storiesData from "@/data/stories.json"

interface Story {
  id: number
  name: string
  image: string
  caption: string
  date: string
}

export function StoriesViewer() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const stories: Story[] = storiesData.stories
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const storyDuration = 5000 // 5 seconds per story

  useEffect(() => {
    if (selectedStoryIndex === null || isPaused) return

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
  }, [selectedStoryIndex, isPaused, stories.length])

  const goToPrevious = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedStoryIndex !== null) {
      if (selectedStoryIndex < stories.length - 1) {
        setSelectedStoryIndex(selectedStoryIndex + 1)
      } else {
        setSelectedStoryIndex(null)
      }
    }
  }

  const handleTapZone = (e: React.MouseEvent<HTMLDivElement>, zone: "left" | "right") => {
    e.stopPropagation()
    if (zone === "left") {
      goToPrevious()
    } else {
      goToNext()
    }
  }

  const selectedStory = selectedStoryIndex !== null ? stories[selectedStoryIndex] : null

  return (
    <>
      {/* Stories Row */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => setSelectedStoryIndex(index)}
            className="flex flex-col items-center space-y-2 flex-shrink-0 group"
          >
            {/* Story Circle with Gradient Ring */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1351d8] via-blue-500 to-cyan-400 rounded-full p-[3px] animate-pulse">
                <div className="bg-white rounded-full p-[3px] w-full h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Erfolgsgeschichten</span>
          </button>
        ))}
      </div>

      {/* Story Modal with Instagram-like behavior */}
      {selectedStory && selectedStoryIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            onClick={() => setSelectedStoryIndex(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedStoryIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 hidden md:flex"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {selectedStoryIndex < stories.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 hidden md:flex"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          <div className="max-w-lg w-full h-full flex items-center relative">
            {/* Left tap zone (previous) */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-[5]"
              onClick={(e) => handleTapZone(e, "left")}
            />

            {/* Right tap zone (next) */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-[5]"
              onClick={(e) => handleTapZone(e, "right")}
            />

            <div className="w-full px-4">
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
        </div>
      )}
    </>
  )
}
