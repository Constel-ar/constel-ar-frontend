"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, User } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morbi.",
      author: "Cha Ji-Hun",
      role: "Amet phasellus interdum.",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morbi.",
      author: "Cha Ji-Hun",
      role: "Amet phasellus interdum.",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque posuere vivamus egestas porttitor. Hendrerit vitae at nulla varius proin ipsum. Purus augue in morbi.",
      author: "Cha Ji-Hun",
      role: "Amet phasellus interdum.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-2">Testimonios</p>
          <h2 className="text-3xl font-bold">What's our customer says?</h2>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="grid md:grid-cols-3 gap-8 px-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-muted rounded-lg p-8 space-y-6 transition-opacity ${
                  index === currentIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
