import { Truck, Shield, Star, Heart, Users, Globe, Award, Clock, ShoppingBag, ChefHat, Leaf, Gift } from 'lucide-react'
import Image from 'next/image'

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Authentic Tradition',
      description: 'We preserve the true essence of traditional Indian recipes, ensuring every bite carries the authentic flavors passed down through generations.'
    },
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Every ingredient is carefully sourced and tested to meet the highest standards of quality and food safety.'
    },
    {
      icon: Users,
      title: 'Family Heritage',
      description: 'We believe in building lasting relationships with our customers and supporting local Indian communities.'
    },
    {
      icon: Globe,
      title: 'Cultural Excellence',
      description: 'We celebrate and share the rich cultural heritage of India through our carefully curated collection of sweets and snacks.'
    }
  ]

  const milestones = [
    {
      year: '2009',
      title: 'Founded',
      description: 'Started with a vision to bring authentic Indian flavors to America'
    },
    {
      year: '2015',
      title: 'First 1000 Customers',
      description: 'Reached our first milestone of serving 1000 happy families'
    },
    {
      year: '2019',
      title: 'Product Expansion',
      description: 'Expanded our collection to include 50+ traditional sweets and snacks'
    },
    {
      year: '2022',
      title: 'National Recognition',
      description: 'Featured in top food magazines and recognized for quality'
    },
    {
      year: '2024',
      title: '50,000+ Families',
      description: 'Serving families across America with authentic Indian treats'
    }
  ]

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Passionate about preserving Indian culinary traditions and bringing authentic flavors to every American home.'
    },
    {
      name: 'Raj Patel',
      role: 'Master Chef',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Master chef with 20+ years of experience in traditional Indian sweets and snacks preparation.'
    },
    {
      name: 'Anjali Desai',
      role: 'Quality Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Ensuring every product meets our high standards of quality and authenticity.'
    }
  ]

  const features = [
    {
      icon: ShoppingBag,
      title: 'Fresh Produce & Spices',
      description: 'Premium agricultural commodities sourced from trusted Indian growers'
    },
    {
      icon: ChefHat,
      title: 'Traditional Recipes',
      description: 'Authentic recipes passed down through generations of master chefs'
    },
    {
      icon: Truck,
      title: 'Fast & Free Shipping',
      description: 'Fast and free USA shipping on orders over $50'
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: '100% natural ingredients with no artificial preservatives'
    }
  ]

  const products = [
    {
      name: 'Gulab Jamun',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'The premium choice with perfect sweetness and traditional rose flavor',
      badge: '100% Natural'
    },
    {
      name: 'Samosa',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Classic Indian snack with savory filling and crispy pastry',
      badge: 'Handcrafted'
    },
    {
      name: 'Ladoo',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Traditional sweet balls with rich texture and authentic taste',
      badge: 'Family Recipe'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-300 rounded-full translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            From Kitchen to Your Family
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deep in India's most traditional kitchens, we handcraft each sweet and snack. Bringing you the luxury of authentic Indian flavors, where every bite tells a story of perfection.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-gray-600 font-medium">
                Premium Sweets & Snacks<br/>From Kitchen to Home
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                50,000+
              </div>
              <div className="text-gray-600 font-medium">
                Luxury Families<br/>Creating Memories
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                15
              </div>
              <div className="text-gray-600 font-medium">
                Years<br/>of Excellence
              </div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-600 font-medium">
                States Blessed<br/>with Our Treats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Legacy of Culinary Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From the traditional Indian kitchens to your family's dining table - our journey of bringing authentic flavors to America's homes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Born in Traditional Kitchens
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Deep in the heart of India, where traditional recipes have been perfected over centuries, our story began. **We don't just deliver sweets and snacks - we bring you culinary luxury.** Since 2009, we've been the guardians of authentic Indian flavors, handcrafting only the most magnificent treats from traditional recipes to grace your family's most precious moments.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every sweet and snack we create is a celebration of tradition, crafted with authentic recipes that have been passed down through generations. We believe that food is not just nourishment for the body, but also for the soul.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Indian sweets and snacks"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years of Tradition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Commented Out
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Premium Sweets & Snacks
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sustainably sourced from India's finest ingredients, delivered fresh to your door
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing ingredients to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-all duration-300 group-hover:scale-110">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            From Traditional Kitchen to Your Heart
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Step into luxury with nature's masterpieces. Each sweet and snack carries the authentic essence of India's most traditional recipes, handcrafted by master chefs and selected by our culinary experts to create your family's most treasured moments.
          </p>
          <div className="flex justify-center">
            <a
              href="/products"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center"
            >
              🍬 Explore Sweet Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
