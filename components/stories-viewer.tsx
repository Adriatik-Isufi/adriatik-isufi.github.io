"use client"

import { useState } from "react"
import { X } from "lucide-react"
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
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const stories: Story[] = storiesData.stories

  return (
    <>
      {/* Stories Row */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setSelectedStory(story)}
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
          </button>
        ))}
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
    </>
  )
}
