'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, FileText, Star, Compass, Shield, MapPin, BadgeCheck, DollarSign, Headphones, Zap, Award, Lock, Users, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { internationalVisas, activities, blogPosts } from '@/lib/data';

const services = [
  { title: 'International Visa', icon: '🌍', href: '/visa/international', desc: 'UK, USA, Schengen & 50+ countries' },
  { title: 'UAE Visa', icon: '🇦🇪', href: '/visa/uae', desc: 'Tourist, transit & extension visas' },
  { title: 'Umrah Packages', icon: '🕋', href: '/umrah', desc: 'Premium packages from Dubai' },
  { title: 'Dubai Activities', icon: '🏖️', href: '/activities', desc: 'Desert Safari, Burj Khalifa & more' },
  { title: 'Travel Insurance', icon: '🛡️', href: '/insurance', desc: 'Worldwide coverage plans' },
  { title: 'Group Tours', icon: '👨‍👩‍👧‍👦', href: '/contact', desc: 'Custom group packages' }
];

const whyChooseUs = [
  'Government Approved',
  'Fast Visa Processing',
  'Best Price Guarantee',
  '24/7 WhatsApp Support',
  '10+ Years Experience',
  'Secure Payments'
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* 🌟 Hero Section - Clean White Background */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block bg-[#0cc0df]/10 text-[#0cc0df] px-4 py-2 rounded-full text-sm font-medium mb-6">
            ✨ Government Approved Travel Agency
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your Gateway to{' '}
            <span className="text-[#0cc0df]">Seamless Travel</span>
          </h1>
          
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Trusted by thousands. Get expert visa services, Umrah packages, and Dubai experiences with just one click.
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="https://wa.me/971565330500?text=Hi%20I%20need%20visa%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0cc0df] text-[#0cc0df] px-8 py-4 rounded-full font-semibold hover:bg-[#0cc0df] hover:text-white transition-all"
            >
              Get Free Quote
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-gray-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-[#0cc0df]" size={20} />
            <span>Govt. Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-[#0cc0df]" size={20} />
            <span>50,000+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="text-[#0cc0df]" size={20} />
            <span>10+ Years Experience</span>
          </div>
        </motion.div>
      </section>

      {/* 🧭 Services Section */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive travel solutions tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all p-8 text-center group"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#0cc0df] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ Why Choose Us */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Thousands Trust Us</h2>
            <p className="text-gray-600">Your satisfaction is our top priority</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="text-[#0cc0df]" size={24} />
                </div>
                <p className="text-gray-800 font-medium">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌍 Featured Visa Destinations */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Popular Visa Destinations</h2>
              <p className="text-gray-600">Quick processing for top destinations</p>
            </div>
            <Link
              href="/visa/international"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Countries <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {internationalVisas.slice(0, 8).map((visa, index) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <span className="text-4xl mb-3 block">{visa.flag}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors">
                    {visa.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{visa.processingTime}</p>
                  <p className="text-[#0cc0df] font-bold mt-2">From {visa.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏖️ Featured Activities */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Dubai Activities</h2>
              <p className="text-gray-600">Experience the best of Dubai</p>
            </div>
            <Link
              href="/activities"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Activities <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 3).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/activities/${activity.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100"
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
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#0cc0df] transition-colors">
                      {activity.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#0cc0df] font-bold text-lg">{activity.price}</span>
                      <span className="text-gray-400 text-sm">{activity.duration}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📩 Quote Form Section */}
      <section id="quote" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form and our travel experts will get back to you within 24 hours with the best options for your trip.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-[#0cc0df]" />
                  </div>
                  <span className="text-gray-700">No hidden charges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#0cc0df]" />
                  </div>
                  <span className="text-gray-700">Fast response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0cc0df]/10 rounded-full flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-[#0cc0df]" />
                  </div>
                  <span className="text-gray-700">Expert travel consultants</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📰 Blog Preview */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Travel Tips & Guides</h2>
              <p className="text-gray-600">Helpful articles to plan your journey</p>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Articles <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100"
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
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#0cc0df] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    <span className="text-gray-400 text-xs mt-3 block">{post.createdAt}</span>
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
