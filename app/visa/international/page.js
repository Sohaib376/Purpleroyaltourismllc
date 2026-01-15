'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';

const internationalVisas = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', processingTime: '15-20 days', price: 'AED 850' },
  { id: 'usa', name: 'United States', flag: '🇺🇸', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400', processingTime: '3-5 weeks', price: 'AED 750' },
  { id: 'schengen', name: 'Schengen', flag: '🇪🇺', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', processingTime: '10-15 days', price: 'AED 450' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400', processingTime: '20-30 days', price: 'AED 650' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400', processingTime: '15-25 days', price: 'AED 700' },
  { id: 'turkey', name: 'Turkey', flag: '🇹🇷', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400', processingTime: '3-5 days', price: 'AED 350' },
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400', processingTime: '3-5 days', price: 'AED 250' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400', processingTime: '5-7 days', price: 'AED 300' },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400', processingTime: '5-7 days', price: 'AED 400' },
  { id: 'china', name: 'China', flag: '🇨🇳', img: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400', processingTime: '7-10 days', price: 'AED 550' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400', processingTime: '5-7 days', price: 'AED 450' },
  { id: 'egypt', name: 'Egypt', flag: '🇪🇬', img: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400', processingTime: '3-5 days', price: 'AED 200' },
  { id: 'india', name: 'India', flag: '🇮🇳', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400', processingTime: '3-5 days', price: 'AED 200' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400', processingTime: '3-5 days', price: 'AED 250' },
  { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', processingTime: '3-5 days', price: 'AED 200' },
  { id: 'south-africa', name: 'South Africa', flag: '🇿🇦', img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400', processingTime: '10-15 days', price: 'AED 500' },
];

export default function InternationalVisaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisas = internationalVisas.filter(visa =>
    visa.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Breadcrumb with Hero */}
      <Breadcrumb 
        items={[
          { label: 'Visas', href: '#' },
          { label: 'International Visas' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920"
      />

      {/* Search Bar */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Visa Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-500 mb-8">
            Showing <span className="font-semibold text-gray-900">{filteredVisas.length}</span> countries
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredVisas.map((visa, index) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="relative h-32 sm:h-36 overflow-hidden">
                    <Image
                      src={visa.img}
                      alt={visa.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 left-2 bg-[#0cc0df] text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Clock size={10} />
                      {visa.processingTime}
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      eVisa
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{visa.flag}</span>
                        <span className="text-white font-semibold text-sm drop-shadow-lg">{visa.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-[#0cc0df] font-bold text-sm">From {visa.price}</p>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        Apply <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredVisas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No countries found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#0cc0df] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Can&apos;t find your country?</h2>
            <p className="text-gray-600 mb-6">
              We process visas for over 50 countries. Contact us for any destination not listed here.
            </p>
            <a
              href="https://wa.me/971565330500?text=Hi,%20I%20need%20visa%20assistance%20for%20a%20country%20not%20listed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20bd5a] transition"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-semibold text-lg mb-4">Get Visa Assistance</h3>
            <ContactForm source="international-visa-page" />
          </div>
        </div>
      </section>
    </div>
  );
}
