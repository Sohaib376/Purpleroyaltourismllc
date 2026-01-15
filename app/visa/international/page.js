'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { internationalVisas } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function InternationalVisaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisas = internationalVisas.filter(visa =>
    visa.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0cc0df] to-[#0a9bb5] py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">International Visa Services</h1>
            <p className="text-lg text-white/90 mb-8">
              Get your visa for 50+ countries with fast processing and expert assistance. Government approved agency with 10+ years of experience.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for a country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visa Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredVisas.map((visa, index) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <span className="text-5xl mb-4 block">{visa.flag}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors text-lg">
                    {visa.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{visa.processingTime}</p>
                  <p className="text-[#0cc0df] font-bold mt-2">From {visa.price}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#0cc0df] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply Now <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Can&apos;t find your country?</h2>
              <p className="text-gray-600 mb-6">
                We process visas for over 50 countries. Contact us for any destination not listed here and we&apos;ll help you with the process.
              </p>
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20visa%20assistance%20for%20a%20country%20not%20listed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Get Visa Assistance</h3>
              <ContactForm source="international-visa-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
