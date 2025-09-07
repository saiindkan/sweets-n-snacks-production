import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    id: 'sweets',
    name: 'Sweets',
    description: 'Traditional mithai and desserts from across India',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: 45
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Crunchy namkeen and savory treats',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: 32
  }
]

const Categories = () => {
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
            Shop by <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated categories of authentic Indian sweets and snacks, each offering unique flavors and traditional experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100 hover:border-amber-200"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    {category.count} items
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
                  {category.description}
                </p>
                
                <div className="mt-3 inline-flex items-center text-sm font-medium text-amber-300 group-hover:text-amber-200 transition-colors duration-300">
                  Shop Now
                  <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25"
          >
            View All Categories
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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

export default Categories
