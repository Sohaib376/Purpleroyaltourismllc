'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Send, CheckCircle, Clock, Plane, FileCheck, Shield, Users, Star, Zap, Award, Headphones } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const services = [
  { emoji: '🌍', title: 'International Visa', href: '/visa/international', desc: 'UK, USA, Schengen & more' },
  { emoji: '🇦🇪', title: 'UAE Visa', href: '/visa/uae', desc: 'Tourist & transit visas' },
  { emoji: '🕋', title: 'Umrah Packages', href: '/umrah', desc: 'Premium packages' },
  { emoji: '🏖️', title: 'Dubai Activities', href: '/activities', desc: '40+ attractions' },
  { emoji: '🛡️', title: 'Travel Insurance', href: '/insurance', desc: 'Worldwide coverage' }
];

// 8 Popular Visa Destinations (2x4 grid)
const featuredVisas = [
  { name: 'United Kingdom', flag: '🇬🇧', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', time: '15-20 Days', price: 'AED 850', id: 'uk' },
  { name: 'USA', flag: '🇺🇸', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400', time: '3-5 Weeks', price: 'AED 750', id: 'usa' },
  { name: 'Canada', flag: '🇨🇦', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400', time: '20-30 Days', price: 'AED 650', id: 'canada' },
  { name: 'Schengen', flag: '🇪🇺', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400', time: '10-15 Days', price: 'AED 450', id: 'schengen' },
  { name: 'Australia', flag: '🇦🇺', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400', time: '15-25 Days', price: 'AED 700', id: 'australia' },
  { name: 'Turkey', flag: '🇹🇷', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400', time: '3-5 Days', price: 'AED 350', id: 'turkey' },
  { name: 'Thailand', flag: '🇹🇭', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400', time: '3-5 Days', price: 'AED 250', id: 'thailand' },
  { name: 'Japan', flag: '🇯🇵', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400', time: '5-7 Days', price: 'AED 450', id: 'japan' }
];

// UAE Tourist Visa Types (2x4 grid)
const uaeVisaTypes = [
  { name: 'A2A Visa Change', desc: 'Airport to Airport visa change service', price: 'AED 1,200', icon: Plane, color: 'bg-blue-500' },
  { name: 'B2B Visa Change', desc: 'Border to Border visa change', price: 'AED 800', icon: FileCheck, color: 'bg-purple-500' },
  { name: '60 Days Tourist Visa', desc: 'Extended stay tourist visa', price: 'AED 850', icon: Clock, color: 'bg-green-500' },
  { name: '30 Days Tourist Visa', desc: 'Standard tourist visa', price: 'AED 450', icon: Shield, color: 'bg-cyan-500' },
  { name: '14 Days Tourist Visa', desc: 'Short stay visa', price: 'AED 350', icon: Zap, color: 'bg-orange-500' },
  { name: '90 Days Tourist Visa', desc: 'Long stay visa', price: 'AED 1,200', icon: Star, color: 'bg-pink-500' },
  { name: 'Transit Visa (96 hrs)', desc: 'Stopover visa', price: 'AED 200', icon: Plane, color: 'bg-indigo-500' },
  { name: 'Visa Extension', desc: 'Extend your current visa', price: 'AED 900', icon: Award, color: 'bg-teal-500' }
];

// 16 Dubai Activities (4x4 grid)
const dubaiActivities = [
  { id: 'desert-safari', name: 'Desert Safari', price: 'AED 150', img: 'https://images.unsplash.com/photo-1504326787394-e6d75cae8027?w=400', category: 'Adventure' },
  { id: 'burj-khalifa', name: 'Burj Khalifa', price: 'AED 180', img: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5?w=400', category: 'Landmarks' },
  { id: 'dubai-marina-cruise', name: 'Marina Cruise', price: 'AED 120', img: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba?w=400', category: 'Cruises' },
  { id: 'abu-dhabi-tour', name: 'Abu Dhabi Tour', price: 'AED 200', img: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490?w=400', category: 'City Tours' },
  { id: 'dubai-frame', name: 'Dubai Frame', price: 'AED 75', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=400', category: 'Landmarks' },
  { id: 'aquaventure', name: 'Aquaventure', price: 'AED 320', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', category: 'Theme Parks' },
  { id: 'miracle-garden', name: 'Miracle Garden', price: 'AED 100', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', category: 'Attractions' },
  { id: 'global-village', name: 'Global Village', price: 'AED 25', img: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=400', category: 'Entertainment' },
  { id: 'ski-dubai', name: 'Ski Dubai', price: 'AED 220', img: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400', category: 'Adventure' },
  { id: 'dhow-cruise', name: 'Creek Dhow Cruise', price: 'AED 99', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', category: 'Cruises' },
  { id: 'museum-future', name: 'Museum of Future', price: 'AED 149', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=400', category: 'Museums' },
  { id: 'img-worlds', name: 'IMG Worlds', price: 'AED 299', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'palm-jumeirah', name: 'Palm Jumeirah', price: 'AED 150', img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400', category: 'Landmarks' },
  { id: 'deep-dive', name: 'Deep Dive Dubai', price: 'AED 400', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', category: 'Adventure' },
  { id: 'ferrari-world', name: 'Ferrari World', price: 'AED 350', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'hot-air-balloon', name: 'Hot Air Balloon', price: 'AED 900', img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400', category: 'Adventure' }
];

const whyChooseUs = [
  { icon: Shield, title: 'Govt Approved', desc: 'Licensed UAE travel agency' },
  { icon: Zap, title: 'Fast Processing', desc: 'Quick visa turnaround' },
  { icon: Headphones, title: '24/7 Support', desc: 'WhatsApp assistance' },
  { icon: Star, title: 'Best Prices', desc: 'No hidden charges' },
  { icon: Award, title: '10+ Years', desc: 'Trusted experience' },
  { icon: Users, title: '50,000+ Clients', desc: 'Happy travelers' }
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
      {/* 💥 HERO SECTION */}
      <section className="relative">
        <div className="relative h-[85vh] min-h-[600px] flex flex-col justify-center items-center text-center px-6">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
              alt="Dubai Skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium mb-6"
            >
              ✨ Government Approved Tourism Agency
            </motion.span>
            
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Visa Simplified,<br />
              <span className="text-[#0cc0df]">Travel Made Easy.</span>
            </h1>
            
            <p className="text-white/90 max-w-2xl mx-auto text-lg sm:text-xl mb-10">
              Apply for international visas, Umrah packages, or UAE travel — all in one place. Fast, secure, and trusted by thousands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20visa%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20bd5a] transition shadow-2xl shadow-green-500/30"
              >
                <MessageCircle size={22} />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-xl"
              >
                Get Free Quote
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧭 SERVICES GRID */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-500">Everything you need for your travel journey</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={service.href}
                  className="block bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{service.emoji}</div>
                  <h3 className="text-gray-900 font-semibold">{service.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 POPULAR VISA DESTINATIONS - 2x4 Grid */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Popular Visa Destinations</h2>
              <p className="text-gray-500">Fast processing for top countries</p>
            </div>
            <Link
              href="/visa/international"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0cc0df] text-white px-5 py-2.5 rounded-full font-medium hover:bg-cyan-600 transition"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredVisas.map((visa, i) => (
              <motion.div
                key={visa.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-32 sm:h-36 overflow-hidden">
                    <Image src={visa.img} alt={visa.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 left-2 bg-[#0cc0df] text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Clock size={10} />
                      {visa.time}
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
                    <p className="text-[#0cc0df] font-bold text-sm">From {visa.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/visa/international" className="inline-flex items-center gap-2 text-[#0cc0df] font-medium">
              View All Countries <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 🇦🇪 UAE TOURIST VISA - 2x4 Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <span className="text-4xl mb-2 block">🇦🇪</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">UAE Tourist Visa</h2>
              <p className="text-gray-500">Fast processing with 24-48 hours turnaround</p>
            </div>
            <Link
              href="/visa/uae"
              className="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {uaeVisaTypes.map((visa, i) => (
              <motion.div
                key={visa.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link
                  href="/visa/uae"
                  className="block bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full"
                >
                  <div className={`w-12 h-12 ${visa.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <visa.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{visa.name}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{visa.desc}</p>
                  <p className="text-[#0cc0df] font-bold">{visa.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ WHY CHOOSE US */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#0cc0df] to-cyan-600">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Why Choose Purple Royal</h2>
            <p className="text-white/80">Trusted by thousands of travelers worldwide</p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <item.icon className="text-[#0cc0df]" size={24} />
                </div>
                <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-white/70 text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏖️ DUBAI ACTIVITIES - 4x4 Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Dubai Activities & Tours</h2>
              <p className="text-gray-500">Discover the best experiences in Dubai & UAE</p>
            </div>
            <Link
              href="/activities"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0cc0df] text-white px-5 py-2.5 rounded-full font-medium hover:bg-cyan-600 transition"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dubaiActivities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={`/activities/${activity.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="relative h-28 sm:h-32 overflow-hidden">
                    <Image src={activity.img} alt={activity.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2 py-1 rounded-full">
                      {activity.category}
                    </span>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-semibold text-sm drop-shadow-lg truncate">{activity.name}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[#0cc0df] font-bold text-sm">{activity.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📩 QUOTE FORM */}
      <section id="quote" className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our travel experts will get back to you within 24 hours with the best options for your trip.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: 'No hidden charges or fees' },
                  { icon: Zap, text: 'Fast response within 24 hours' },
                  { icon: Headphones, text: 'Expert travel consultants' },
                  { icon: Shield, text: 'Secure & confidential' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center">
                      <item.icon className="text-[#0cc0df]" size={20} />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
            >
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We&apos;ll get back to you soon.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-[#0cc0df] hover:underline">
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
                    >
                      <option value="">Select Service *</option>
                      <option value="international-visa">International Visa</option>
                      <option value="uae-visa">UAE Visa</option>
                      <option value="umrah">Umrah Package</option>
                      <option value="activities">Dubai Activities</option>
                      <option value="insurance">Travel Insurance</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0cc0df] text-white py-4 rounded-xl font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-cyan-500/30"
                  >
                    {loading ? 'Submitting...' : <><Send size={18} /> Get Free Quote</>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📰 BLOG PREVIEW */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Travel Tips & Guides</h2>
              <p className="text-gray-500">Helpful articles to plan your journey</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#0cc0df] text-white text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
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
