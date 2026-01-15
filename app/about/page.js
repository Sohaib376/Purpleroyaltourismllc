'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, Globe, Shield, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Purple Royal Tourism</h1>
            <p className="text-lg text-white/90">
              Your trusted travel partner in Dubai, serving thousands of travelers since 2014
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Purple Royal Tourism was established with a vision to make travel accessible, affordable, and hassle-free for everyone. Based in the heart of Dubai, we have grown to become one of the most trusted tourism agencies in the UAE.
                </p>
                <p>
                  Our team of experienced travel consultants is dedicated to providing personalized service, ensuring that every journey you take is memorable. From visa processing to Umrah packages, from Dubai tours to international travel, we handle it all with expertise and care.
                </p>
                <p>
                  As a government-approved tourism agency, we pride ourselves on our commitment to transparency, reliability, and customer satisfaction. Our extensive network of partners worldwide enables us to offer competitive prices without compromising on quality.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1584546459262-0ddde08da490"
                alt="Dubai Skyline"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years Experience', icon: Award },
              { number: '50,000+', label: 'Happy Customers', icon: Users },
              { number: '50+', label: 'Countries Covered', icon: Globe },
              { number: '98%', label: 'Success Rate', icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-[#0cc0df]" size={28} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What sets us apart from the rest</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Trust & Transparency', desc: 'No hidden fees, no surprises. We believe in honest pricing and clear communication.' },
              { title: 'Customer First', desc: 'Your satisfaction is our priority. We go above and beyond to meet your travel needs.' },
              { title: 'Expert Guidance', desc: 'Our experienced team provides professional advice for all your travel requirements.' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
              >
                <CheckCircle className="text-[#0cc0df] mb-4" size={32} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-8">Get in touch with our team today</p>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <ContactForm source="about-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
