'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0cc0df] to-[#0a9bb5] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white/90">
              Have questions? We&apos;re here to help. Reach out to us via phone, email, or visit our office.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Our team is available to assist you with all your travel needs. Contact us through any of the following methods.
                </p>
              </div>

              <div className="space-y-6">
                <a href="tel:+971565330500" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#0cc0df]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0cc0df] transition-colors">
                    <Phone className="text-[#0cc0df] group-hover:text-white transition-colors" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+971 56 533 0500</p>
                  </div>
                </a>

                <a href="mailto:info@purpleroyaltourism.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-[#0cc0df]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0cc0df] transition-colors">
                    <Mail className="text-[#0cc0df] group-hover:text-white transition-colors" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@purpleroyaltourism.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0cc0df]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#0cc0df]" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Address</h3>
                    <p className="text-gray-600">CBD Bank Building, Sharaf DG Metro Exit 1<br />Office No 12, 3rd Floor<br />Al Mankhool, Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0cc0df]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-[#0cc0df]" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                    <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 6:00 PM<br />Friday - Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={24} />
                <div>
                  <div className="text-sm opacity-90">Prefer WhatsApp?</div>
                  <div className="font-semibold">Chat with us instantly</div>
                </div>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <ContactForm source="contact-page" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.7548!2d55.2962!3d25.2485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzU0LjYiTiA1NcKwMTcnNDYuMyJF!5e0!3m2!1sen!2sae!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Purple Royal Tourism Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
