'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { uaeVisas } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export default function UAEVisaPage() {
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
            <span className="text-5xl mb-4 block">🇦🇪</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">UAE Visa Services</h1>
            <p className="text-lg text-white/90">
              Fast and reliable UAE visa processing. Tourist visas, transit visas, and extensions. Same-day processing available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {uaeVisas.map((visa, index) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{visa.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {visa.processingTime}
                    </span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Validity: {visa.validity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Single/Multiple Entry</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0cc0df]">{visa.price}</span>
                    <Link
                      href={`/visa/uae/${visa.id}`}
                      className="inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
                    >
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Our UAE Visa Service?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-[#0cc0df]" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600 text-sm">Same-day processing for urgent applications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-[#0cc0df]" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">High Approval Rate</h3>
                <p className="text-gray-600 text-sm">98% visa approval rate with proper documentation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="text-[#0cc0df]" size={28} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Process</h3>
                <p className="text-gray-600 text-sm">Simple application with minimal documents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Apply for UAE Visa</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <ContactForm source="uae-visa-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
