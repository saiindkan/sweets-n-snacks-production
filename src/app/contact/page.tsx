'use client'

import { Phone, Mail, MapPin, Clock, Users, Star, Shield } from 'lucide-react'

const ContactPage = () => {

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-300 rounded-full translate-x-40 translate-y-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg">
              <span className="mr-2">🍯</span>
              We're Here to Help • Fast Response • Personal Care
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Let's Chat</span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                About Your Order
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
              Have questions? Need help choosing the perfect sweets? We're here to make your Indian food dreams come true!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <a
                href="tel:+15512254096"
                className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 text-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Call Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="mailto:info@indkanworldwideexim.com"
                className="border-2 sm:border-3 border-amber-600 text-amber-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 text-center bg-white/80 backdrop-blur-sm shadow-lg"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                &lt; 24h
              </div>
              <div className="text-sm text-amber-700 font-medium mt-2">Response Time</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-sm text-orange-700 font-medium mt-2">States Served</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-red-700 font-medium mt-2">Support Available</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                4.9/5
              </div>
              <div className="text-sm text-pink-700 font-medium mt-2">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Our Locations</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Serving premium Indian sweets and snacks nationwide from our strategic locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">New York Headquarters</h3>
                <p className="text-gray-600">Your trusted partner for premium Indian sweets</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🌲</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">West Coast Operations</h3>
                <p className="text-gray-600">Fresh deliveries to the Pacific region</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🚛</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Southern Distribution</h3>
                <p className="text-gray-600">Fast shipping across the southern states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">New York Headquarters</h2>
            <p className="text-xl text-gray-700">Your trusted partner for premium Indian sweets and snacks</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-700">
                  240 West 40th Street<br />
                  New York, NY 10018<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-700">+1 (551) 225-4096</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-700">info@indkanworldwideexim.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-700">
                  Mon-Fri: 9AM-6PM<br />
                  Sat: 10AM-4PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Prefer to reach us directly?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+15512254096"
                className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Call: +1 (551) 225-4096
              </a>
              <a
                href="mailto:info@indkanworldwideexim.com"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage