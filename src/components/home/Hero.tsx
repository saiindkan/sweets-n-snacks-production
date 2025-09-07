import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-300 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 relative z-10">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Royal</span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Indian Sweets
                </span>
                <br />
                <span className="text-gray-800">& Exotic Snacks</span>
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg">
              Experience the opulence of traditional Indian mithai, crafted with centuries-old recipes and premium ingredients. From royal gulab jamun to artisanal namkeen, indulge in authentic flavors that tell the story of India's rich culinary heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/products"
                className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 text-center relative overflow-hidden"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/categories"
                className="border-2 sm:border-3 border-amber-600 text-amber-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 text-center bg-white/80 backdrop-blur-sm shadow-lg"
              >
                View Categories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-10 lg:pt-12 border-t border-amber-200">
              <div className="text-center group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-xs sm:text-sm text-amber-700 font-medium">Premium Products</div>
              </div>
              <div className="text-center group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-xs sm:text-sm text-orange-700 font-medium">Satisfied Customers</div>
              </div>
              <div className="text-center group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-xs sm:text-sm text-red-700 font-medium">Premium Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] group">
              {/* Elegant Gold Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl p-6 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                {/* Inner White Mat */}
                <div className="absolute inset-4 bg-white rounded-xl shadow-inner">
                  {/* Image Container */}
                  <div className="absolute inset-6 overflow-hidden rounded-lg">
                    <Image
                      src="/intro sliideshow/pexels-gaurav-kumar-1281378-18488297.jpg"
                      alt="Traditional Indian sweets and snacks - Premium collection by Gaurav Kumar"
                      fill
                      className="object-cover -rotate-90 transition-transform duration-700 group-hover:scale-110"
                      priority
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
              
              {/* Ornate Corner Details */}
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full shadow-xl border-4 border-white transform rotate-45"></div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full shadow-xl border-4 border-white transform rotate-45"></div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-xl border-4 border-white transform rotate-45"></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-full shadow-xl border-4 border-white transform rotate-45"></div>
              
              {/* Elegant Border Accent */}
              <div className="absolute inset-0 border-2 border-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 rounded-2xl opacity-80"></div>
              
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-amber-300/20 to-orange-400/20 rounded-2xl blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-red-300 to-pink-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Indian-inspired decorative patterns */}
      <div className="absolute top-40 right-40 w-16 h-16 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
    </section>
  )
}

export default Hero
