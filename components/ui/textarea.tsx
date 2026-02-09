import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-all duration-200 ease-out placeholder:text-gray-400 placeholder:font-light hover:border-gray-300 focus:border-[#1351d8] focus:outline-none focus:ring-4 focus:ring-[#1351d8]/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
