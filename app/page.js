'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { internationalVisas, activities, blogPosts } from '@/lib/data';

const services = [
  { icon: '🌍', title: 'International Visa', href: '/visa/international' },
  { icon: '🇦🇪', title: 'UAE Visa', href: '/visa/uae' },
  { icon: '🕋', title: 'Umrah Packages', href: '/umrah' },
  { icon: '🏖️', title: 'Dubai Activities', href: '/activities' },
  { icon: '🛡️', title: 'Travel Insurance', href: '/insurance' }
];

const featuredVisas = [
  { name: 'United Kingdom', flag: '🇬🇧', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', time: '15-20 Days', price: 'From AED 850', id: 'uk' },
  { name: 'USA', flag: '🇺🇸', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400', time: '3-5 Weeks', price: 'From AED 750', id: 'usa' },
  { name: 'Canada', flag: '🇨🇦', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400', time: '20-30 Days', price: 'From AED 650', id: 'canada' },
  { name: 'Schengen', flag: '🇪🇺', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', time: '10-15 Days', price: 'From AED 450', id: 'schengen' }
];

const whyChooseUs = [
  'Govt Approved Agency',
  'Fast Processing Times',
  'Real-time WhatsApp Support',
  'Best Price Guarantee',
  '10+ Years Experience',
  'Secure Online Payments'
];

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', travelDate: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'homepage-quote' }),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', service: '', travelDate: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 🔹 HERO */}
      <section className="bg-white pt-16 sm:pt-20 pb-16 px-6 text-center relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight"
        >
          Visa Simplified, Travel Made Easy.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-600 mt-4 max-w-xl mx-auto"
        >
          Apply for visas to 50+ countries, book Umrah, or explore Dubai — all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <a
            href="https://wa.me/971565330500?text=Hi,%20I%20need%20visa%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#0cc0df] text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-600 transition shadow-lg"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#0cc0df] text-[#0cc0df] px-8 py-3 rounded-full font-semibold hover:bg-[#0cc0df] hover:text-white transition"
          >
            Get Free Quote
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </section>

      {/* 🔹 SERVICES GRID */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={service.href}
                className="block bg-white rounded-xl shadow-md text-center p-6 hover:shadow-xl transition border border-gray-100"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">{service.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 FEATURED VISA DESTINATIONS (Atlys-style Cards) */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Visa Destinations</h2>
            <Link
              href="/visa/international"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVisas.map((visa, i) => (
              <motion.div
                key={visa.name}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block relative bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={visa.img}
                      alt={visa.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {visa.time}
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                      eVisa
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{visa.flag}</span>
                      <h3 className="font-semibold text-gray-800">{visa.name}</h3>
                    </div>
                    <p className="text-sm text-[#0cc0df] font-semibold mt-1">{visa.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/visa/international"
              className="inline-flex items-center gap-1 text-[#0cc0df] font-medium"
            >
              View All Countries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 WHY CHOOSE US */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">Why Choose Purple Royal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {whyChooseUs.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-[#0cc0df]" size={20} />
              </div>
              <p className="text-gray-700 font-medium">{point}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 POPULAR ACTIVITIES */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dubai Activities</h2>
            <Link
              href="/activities"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 3).map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/activities/${activity.id}`}
                  className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                      {activity.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors">
                      {activity.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#0cc0df] font-bold">{activity.price}</span>
                      <span className="text-gray-400 text-sm">{activity.duration}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CTA FORM */}
      <section id="quote" className="bg-white py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Get a Free Quote</h2>
          <p className="text-gray-500 text-center mb-6">Our team will contact you within 24 hours</p>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">We&apos;ll get back to you soon.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-[#0cc0df] hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
              />
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
              >
                <option value="">Select Service</option>
                <option value="international-visa">International Visa</option>
                <option value="uae-visa">UAE Visa</option>
                <option value="umrah">Umrah Package</option>
                <option value="activities">Dubai Activities</option>
                <option value="insurance">Travel Insurance</option>
              </select>
              <input
                type="date"
                placeholder="Travel Date (optional)"
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0cc0df] text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send size={18} />
                    Submit
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* 🔹 BLOG PREVIEW */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Travel Tips & Guides</h2>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#0cc0df] text-white text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
