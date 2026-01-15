'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, FileText, MessageCircle } from 'lucide-react';
import { uaeVisas } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const visaRequirements = {
  '14-day': ['Passport copy (clear scan)', 'Passport-size photograph', 'Flight ticket copy'],
  '30-day': ['Passport copy (clear scan)', 'Passport-size photograph', 'Flight ticket copy'],
  '60-day': ['Passport copy (clear scan)', 'Passport-size photograph', 'Flight ticket copy', 'Hotel booking confirmation'],
  '90-day': ['Passport copy (clear scan)', 'Passport-size photograph', 'Flight ticket copy', 'Hotel booking confirmation', 'Bank statement'],
  'transit': ['Passport copy (clear scan)', 'Passport-size photograph', 'Confirmed onward ticket'],
  'extension': ['Current visa copy', 'Passport copy', 'Emirates ID (if applicable)', 'Proof of accommodation']
};

export default function UAEVisaDetailPage() {
  const params = useParams();
  const typeId = params.type;
  
  const visa = uaeVisas.find(v => v.id === typeId);
  const requirements = visaRequirements[typeId] || visaRequirements['30-day'];

  if (!visa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Visa type not found</h1>
          <Link href="/visa/uae" className="text-[#0cc0df] hover:underline">
            Back to UAE visas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0cc0df] to-[#0a9bb5] py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/visa/uae"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back to UAE visas
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <span className="text-5xl mb-4 block">🇦🇪</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{visa.name}</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Fast and reliable UAE visa processing with {visa.processingTime.toLowerCase()} turnaround.
            </p>
            
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Clock className="text-white/80" size={20} />
                <span>Processing: {visa.processingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-white/80" size={20} />
                <span>Validity: {visa.validity}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="text-[#0cc0df]" />
                  Documents Required
                </h2>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={18} />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h2>
                <div className="space-y-4">
                  {[
                    'Send us your documents via WhatsApp or email',
                    'Receive payment link and complete payment',
                    'We process your visa application',
                    'Receive visa via email within processing time'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#0cc0df] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Visa Fee</h3>
                  <div className="text-3xl font-bold text-[#0cc0df] mb-4">{visa.price}</div>
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20need%20UAE%20${visa.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle size={18} />
                    Apply via WhatsApp
                  </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Inquiry</h3>
                  <ContactForm source={`uae-visa-${typeId}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
