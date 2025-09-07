'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Your Supabase images - replace with your actual image URLs
  const images = [
    {
      id: 1,
      src: "/intro-slideshow/delicious-indian-dessert-arrangement-view.jpg",
      alt: "Delicious Indian dessert arrangement",
      title: "Traditional Sweets Collection"
    },
    {
      id: 2,
      src: "/intro-slideshow/festive-indian-sweets-decorations-diwali.jpg",
      alt: "Festive Indian sweets decorations",
      title: "Festive Delights"
    },
    {
      id: 3,
      src: "/intro-slideshow/from-assorted-baked-with-baklava-baklava-sheki-flowers-smoked-fish.jpg",
      alt: "Assorted Indian sweets and desserts",
      title: "Premium Collection"
    },
    {
      id: 4,
      src: "/intro-slideshow/high-angle-delicious-sweets-plate.jpg",
      alt: "High angle view of delicious sweets plate",
      title: "Artisan Creations"
    },
    {
      id: 5,
      src: "/intro-slideshow/high-angle-indian-dessert-bowl.jpg",
      alt: "Indian dessert bowl with traditional sweets",
      title: "Traditional Treats"
    }
  ]

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Decorative background elements matching hero */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full translate-x-40 -translate-y-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-red-200 to-pink-300 rounded-full -translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Delicious</span> Collection
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our handcrafted Indian sweets and snacks, made with love and traditional recipes passed down through generations
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((image) => (
                <div key={image.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-96 md:h-[500px] lg:h-[600px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={image.id === 1}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Image title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-lg text-gray-200">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 scale-125 shadow-amber-500/50'
                    : 'bg-white/80 hover:bg-white border-2 border-amber-300 hover:border-amber-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 font-medium">
              {currentSlide + 1} of {images.length}
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements matching hero */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-red-300 to-pink-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Indian-inspired decorative patterns */}
      <div className="absolute top-40 left-40 w-16 h-16 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-40 right-40 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
    </section>
  )
}

export default ImageCarousel
