'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Send, CheckCircle, Clock } from 'lucide-react';
import { activities, blogPosts } from '@/lib/data';

const services = [
  { emoji: '🌍', title: 'International Visa', href: '/visa/international' },
  { emoji: '🇦🇪', title: 'UAE Visa', href: '/visa/uae' },
  { emoji: '🕋', title: 'Umrah Packages', href: '/umrah' },
  { emoji: '🏖️', title: 'Dubai Activities', href: '/activities' },
  { emoji: '🛡️', title: 'Travel Insurance', href: '/insurance' }
];

const featuredVisas = [
  { name: 'United Kingdom', flag: '🇬🇧', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', time: '15-20 Days', price: 'From AED 850', id: 'uk' },
  { name: 'USA', flag: '🇺🇸', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400', time: '3-5 Weeks', price: 'From AED 750', id: 'usa' },
  { name: 'Canada', flag: '🇨🇦', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400', time: '20-30 Days', price: 'From AED 650', id: 'canada' },
  { name: 'Schengen', flag: '🇪🇺', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', time: '10-15 Days', price: 'From AED 450', id: 'schengen' }
];

const whyChooseUs = [
  { title: 'Govt Approved', desc: 'Licensed UAE travel agency' },
  { title: 'Fast Processing', desc: 'Quick visa turnaround' },
  { title: '24/7 Support', desc: 'WhatsApp assistance' },
  { title: 'Best Prices', desc: 'No hidden charges' },
  { title: '10+ Years', desc: 'Trusted experience' },
  { title: 'Secure Payments', desc: 'Safe transactions' }
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
      {/* 💥 Hero Section with Background Image */}
      <section className="relative">
        <div className="relative h-[80vh] min-h-[500px] flex flex-col justify-center items-center text-center px-6">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
              alt="Dubai Skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Visa Simplified, Travel Made Easy.
            </h1>
            <p className="text-white/90 max-w-xl mx-auto text-lg sm:text-xl mb-8">
              Apply for international visas, Umrah, or UAE travel — all in one place. Fast, secure, and trusted.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20visa%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20bd5a] transition shadow-lg"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Get Free Quote
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧭 Services Grid */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="block bg-white p-5 rounded-xl shadow text-center border border-gray-100 hover:shadow-lg hover:border-[#0cc0df]/30 transition"
              >
                <div className="text-4xl mb-2">{service.emoji}</div>
                <h3 className="text-gray-800 font-semibold text-sm">{service.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌍 Featured Visa Destinations (Atlys-style) */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Visa Destinations</h2>
            <Link
              href="/visa/international"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredVisas.map((visa, i) => (
              <motion.div
                key={visa.name}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block relative bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={visa.img}
                      alt={visa.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                      <Clock size={12} />
                      {visa.time}
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                      eVisa
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{visa.flag}</span>
                      <h3 className="font-semibold text-gray-800">{visa.name}</h3>
                    </div>
                    <p className="text-sm text-[#0cc0df] font-semibold mt-1">{visa.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/visa/international"
              className="inline-flex items-center gap-1 text-[#0cc0df] font-medium"
            >
              View All Countries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Us */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Why Choose Purple Royal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="text-[#0cc0df]" size={18} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏖️ Dubai Activities */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Dubai Activities</h2>
            <Link
              href="/activities"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <div className="relative h-44 overflow-hidden">
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

      {/* 📩 Quote Form */}
      <section id="quote" className="py-12 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Get a Free Quote</h2>
          <p className="text-gray-500 text-center text-sm mb-6">Our team will contact you within 24 hours</p>

          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-green-500" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Thank You!</h3>
              <p className="text-gray-600 text-sm">We&apos;ll get back to you soon.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-[#0cc0df] hover:underline text-sm"
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
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none text-sm"
              />
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none text-sm"
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
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0cc0df] text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send size={16} />
                    Submit
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* 📰 Blog Preview */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Travel Tips & Guides</h2>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <div className="relative h-44 overflow-hidden">
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
