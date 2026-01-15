'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, DollarSign, FileText, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { internationalVisas } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

// Extended visa data with more details
const visaDetails = {
  uk: {
    fullName: 'United Kingdom',
    description: 'The UK Standard Visitor Visa allows you to visit the UK for tourism, business, or to visit family and friends.',
    requirements: [
      'Valid passport (6+ months validity)',
      'Completed visa application form',
      'Two recent passport-sized photographs',
      'Bank statements (last 6 months)',
      'Employment letter or business documents',
      'Travel itinerary and accommodation proof',
      'Travel insurance coverage'
    ],
    process: [
      'Submit documents to our office',
      'We review and prepare your application',
      'Book appointment at VFS Global',
      'Attend biometrics appointment',
      'Wait for visa processing',
      'Collect passport with visa'
    ],
    faqs: [
      { q: 'How long does UK visa processing take?', a: 'Standard processing takes 15-20 working days. Priority service available for faster processing.' },
      { q: 'Can I apply for UK visa from UAE?', a: 'Yes, UAE residents can apply for UK visa through VFS Global centers in Dubai or Abu Dhabi.' },
      { q: 'What is the validity of UK tourist visa?', a: 'UK tourist visa is typically valid for 6 months, allowing multiple entries.' }
    ]
  },
  usa: {
    fullName: 'United States of America',
    description: 'The B1/B2 US Visitor Visa allows you to visit the USA for business (B1) or tourism/pleasure (B2).',
    requirements: [
      'Valid passport (6+ months validity)',
      'DS-160 form confirmation',
      'Visa fee payment receipt',
      'Photograph meeting US requirements',
      'Bank statements (last 6 months)',
      'Employment verification letter',
      'Property documents (if applicable)',
      'Previous travel history proof'
    ],
    process: [
      'Complete DS-160 online form',
      'Pay visa application fee',
      'Schedule interview appointment',
      'Attend visa interview at US Consulate',
      'Wait for visa processing',
      'Collect passport with visa'
    ],
    faqs: [
      { q: 'Is interview required for US visa?', a: 'Yes, a personal interview at the US Consulate is mandatory for most applicants.' },
      { q: 'What is the US visa interview like?', a: 'The interview typically lasts 3-5 minutes. The officer will ask about your travel purpose, ties to UAE, and financial situation.' },
      { q: 'How long is US tourist visa valid?', a: 'US B1/B2 visa is typically valid for 10 years with multiple entries allowed.' }
    ]
  },
  schengen: {
    fullName: 'Schengen Area (26 Countries)',
    description: 'The Schengen Visa allows you to travel freely across 26 European countries for tourism, business, or family visits.',
    requirements: [
      'Valid passport (3+ months beyond stay)',
      'Completed Schengen visa application',
      'Two recent photographs',
      'Travel insurance (€30,000 minimum)',
      'Flight reservation',
      'Hotel bookings for entire stay',
      'Bank statements (last 3 months)',
      'Employment letter with salary details'
    ],
    process: [
      'Determine main destination country',
      'Submit documents to embassy/VFS',
      'Pay visa fee',
      'Attend biometrics appointment',
      'Wait for processing (10-15 days)',
      'Collect passport with visa'
    ],
    faqs: [
      { q: 'Which countries can I visit with Schengen visa?', a: 'You can visit all 26 Schengen countries including France, Germany, Italy, Spain, Netherlands, and more.' },
      { q: 'How long can I stay with Schengen visa?', a: 'Maximum 90 days within any 180-day period across all Schengen countries.' },
      { q: 'Do I apply at any Schengen country embassy?', a: 'Apply at the embassy of your main destination country, or the first country of entry if visiting multiple equally.' }
    ]
  }
};

// Default data for other countries
const defaultVisaDetails = {
  requirements: [
    'Valid passport (6+ months validity)',
    'Completed visa application form',
    'Recent passport photographs',
    'Bank statements',
    'Employment/business documents',
    'Travel itinerary',
    'Travel insurance'
  ],
  process: [
    'Submit documents to our office',
    'Document verification',
    'Application submission',
    'Processing period',
    'Visa collection'
  ],
  faqs: [
    { q: 'What documents do I need?', a: 'Basic requirements include valid passport, photographs, bank statements, and employment proof. Contact us for complete list.' },
    { q: 'How long does processing take?', a: 'Processing time varies by country. We provide fast-track options for urgent applications.' }
  ]
};

export default function VisaDetailPage() {
  const params = useParams();
  const countryId = params.country;
  
  const visa = internationalVisas.find(v => v.id === countryId);
  const details = visaDetails[countryId] || defaultVisaDetails;

  if (!visa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h1>
          <Link href="/visa/international" className="text-[#0cc0df] hover:underline">
            Back to all countries
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
            href="/visa/international"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back to all countries
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <span className="text-6xl mb-4 block">{visa.flag}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{details.fullName || visa.name} Visa</h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {details.description || `Get your ${visa.name} visa with our expert assistance and fast processing.`}
            </p>
            
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="text-white/80" size={20} />
                <span>{visa.processingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="text-white/80" size={20} />
                <span>From {visa.price}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="text-[#0cc0df]" />
                  Documents Required
                </h2>
                <ul className="space-y-3">
                  {details.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
                <div className="space-y-4">
                  {details.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#0cc0df] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {details.faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Visa Fee</h3>
                  <div className="text-3xl font-bold text-[#0cc0df] mb-2">{visa.price}</div>
                  <p className="text-sm text-gray-500 mb-4">*Service charges included</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Document preparation
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Application submission
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Status tracking
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20need%20${visa.name}%20visa%20assistance`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle size={18} />
                    Apply via WhatsApp
                  </a>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <h3 className="font-semibold text-lg mb-4">Get Free Consultation</h3>
                  <ContactForm source={`visa-${countryId}`} />
                </motion.div>

                {/* Note */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-amber-800">
                      Processing times may vary based on embassy workload. Contact us for current status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
