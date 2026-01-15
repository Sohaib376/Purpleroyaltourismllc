'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Star, Users, Calendar } from 'lucide-react';
import { umrahPackages } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export default function UmrahPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1665308100392-5ab46e8f5fb9"
            alt="Mecca"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Umrah Packages from Dubai</h1>
            <p className="text-lg text-white/90 mb-8">
              Embark on your spiritual journey with our carefully curated Umrah packages. Premium hotels, comfortable transport, and experienced guides to make your pilgrimage memorable.
            </p>
            <a
              href="https://wa.me/971565330500?text=Hi,%20I%20am%20interested%20in%20Umrah%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0cc0df] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0ab0cd] transition-colors"
            >
              Get Package Details
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Umrah Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from our range of packages designed to suit every budget and preference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {umrahPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative h-56">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#0cc0df] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500" />
                      {pkg.hotel}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.includes.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/umrah/${pkg.id}`}
                      className="flex-1 text-center bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/971565330500?text=Hi,%20I%20am%20interested%20in%20${pkg.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#0cc0df] text-white py-3 rounded-lg font-medium hover:bg-[#0ab0cd] transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book Umrah With Us?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Premium Hotels', desc: 'Close to Haram in Makkah & Madinah' },
              { icon: Users, title: 'Experienced Guides', desc: 'Knowledgeable scholars and guides' },
              { icon: Calendar, title: 'Flexible Dates', desc: 'Multiple departure dates available' },
              { icon: CheckCircle, title: 'All-Inclusive', desc: 'Visa, flights, transfers included' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-[#0cc0df]" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Request Umrah Package Quote</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <ContactForm source="umrah-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
