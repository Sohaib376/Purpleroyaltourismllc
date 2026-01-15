'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Heart, Plane, CheckCircle, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const coverageTypes = [
  { name: 'Schengen Travel Insurance', price: 'AED 150', coverage: 'EUR 30,000', duration: 'Up to 30 days', countries: 'All Schengen countries' },
  { name: 'Worldwide Travel Insurance', price: 'AED 200', coverage: 'USD 50,000', duration: 'Up to 30 days', countries: 'Worldwide coverage' },
  { name: 'Annual Multi-Trip Insurance', price: 'AED 750', coverage: 'USD 100,000', duration: '1 Year', countries: 'Worldwide (per trip max 45 days)' },
  { name: 'Family Travel Insurance', price: 'AED 400', coverage: 'USD 50,000', duration: 'Up to 30 days', countries: 'Worldwide (2 adults + 2 children)' }
];

const benefits = [
  'Medical expenses coverage',
  'Emergency medical evacuation',
  'Trip cancellation protection',
  'Lost baggage compensation',
  'Flight delay coverage',
  'Personal accident coverage',
  '24/7 emergency assistance',
  'COVID-19 coverage included'
];

export default function InsurancePage() {
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
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Insurance</h1>
            <p className="text-lg text-white/90">
              Protect your journey with comprehensive travel insurance. Required for Schengen visa and recommended for all international travel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance Plans</h2>
            <p className="text-gray-600">Choose the right coverage for your trip</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {coverageTypes.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coverage:</span>
                    <span className="font-semibold text-gray-900">{plan.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">{plan.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Valid for:</span>
                    <span className="text-gray-900">{plan.countries}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#0cc0df]">{plan.price}</span>
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20need%20${plan.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
                  >
                    Get Quote <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What&apos;s Covered</h2>
              <p className="text-gray-600 mb-8">
                Our travel insurance plans provide comprehensive coverage to ensure you travel with peace of mind.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, title: 'Worldwide Coverage' },
                { icon: Heart, title: 'Medical Support' },
                { icon: Plane, title: 'Flight Protection' },
                { icon: Shield, title: '24/7 Assistance' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
                  <item.icon className="w-10 h-10 text-[#0cc0df] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Get Insurance Quote</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <ContactForm source="insurance-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
