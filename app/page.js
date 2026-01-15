'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, FileText, Star, Compass, Shield, BadgeCheck, DollarSign, Headphones, Zap, Award, Lock, ArrowRight, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { services, internationalVisas, activities, whyChooseUs, blogPosts } from '@/lib/data';

const iconMap = {
  Globe, FileText, Star, Compass, Shield, BadgeCheck, DollarSign, Headphones, Zap, Award, Lock
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1598343530164-8f8922e123ba"
            alt="Dubai Skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block bg-[#0cc0df] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Government Approved Agency
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to <span className="text-[#0cc0df]">Seamless Travel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Expert visa services for 50+ countries, premium Umrah packages, and unforgettable Dubai experiences. Trusted by thousands of travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20assistance%20with%20visa%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Quote
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive travel solutions tailored to your needs</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={service.id} variants={fadeInUp}>
                  <Link
                    href={service.href}
                    className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all group border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-[#0cc0df]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0cc0df] transition-colors">
                      <Icon className="w-7 h-7 text-[#0cc0df] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#0cc0df] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#0cc0df] font-medium mt-4">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trusted by thousands of travelers for reliable and efficient service</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-[#0cc0df] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Visas */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Visa Destinations</h2>
              <p className="text-gray-600">Quick processing for top destinations</p>
            </div>
            <Link
              href="/visa/international"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Countries <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {internationalVisas.slice(0, 8).map((visa) => (
              <motion.div key={visa.id} variants={fadeInUp}>
                <Link
                  href={`/visa/international/${visa.id}`}
                  className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center group border border-gray-100"
                >
                  <span className="text-4xl mb-3 block">{visa.flag}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#0cc0df] transition-colors">
                    {visa.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{visa.processingTime}</p>
                  <p className="text-[#0cc0df] font-semibold mt-2">From {visa.price}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dubai Activities</h2>
              <p className="text-gray-600">Experience the best of Dubai and UAE</p>
            </div>
            <Link
              href="/activities"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Activities <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activities.slice(0, 3).map((activity) => (
              <motion.div key={activity.id} variants={fadeInUp}>
                <Link
                  href={`/activities/${activity.id}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-2 py-1 rounded">
                      {activity.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#0cc0df] transition-colors">
                      {activity.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#0cc0df] font-bold text-lg">{activity.price}</span>
                      <span className="text-gray-500 text-sm">{activity.duration}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Travel Tips & Guides</h2>
              <p className="text-gray-600">Helpful articles to plan your journey</p>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#0cc0df] font-medium hover:underline"
            >
              View All Articles <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#0cc0df] text-white text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#0cc0df] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                    <span className="text-gray-400 text-xs mt-3 block">{post.createdAt}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
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
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
