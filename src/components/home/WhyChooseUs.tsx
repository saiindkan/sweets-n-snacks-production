'use client'

import { CheckCircle, Star, Truck, Shield, Heart } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Star className="h-8 w-8 text-amber-500" />,
      title: "Premium Quality",
      description: "We use only the finest ingredients and traditional recipes to ensure every product meets our high standards."
    },
    {
      icon: <Truck className="h-8 w-8 text-amber-500" />,
      title: "Fast Delivery",
      description: "Fresh products delivered to your doorstep with our reliable and efficient delivery service."
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      title: "Authentic Taste",
      description: "Experience the true flavors of India with our authentic recipes passed down through generations."
    },
    {
      icon: <Heart className="h-8 w-8 text-amber-500" />,
      title: "Made with Love",
      description: "Every sweet and snack is crafted with care and passion, bringing you the warmth of home."
    }
  ]

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Decorative background elements matching hero */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-300 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">INDKAN</span>?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We bring you the authentic taste of India with our commitment to quality, tradition, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100 hover:border-amber-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-3 rounded-full shadow-lg border border-amber-200">
            <CheckCircle className="h-5 w-5 text-amber-600" />
            <span className="font-semibold">Trusted by thousands of satisfied customers</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements matching hero */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-red-300 to-pink-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Indian-inspired decorative patterns */}
      <div className="absolute top-40 right-40 w-16 h-16 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
    </section>
  )
}

export default WhyChooseUs
