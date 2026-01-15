'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

// Extended activities list with codes
const allActivities = [
  { id: 'desert-safari', code: 'DS001', name: 'Desert Safari', price: 'AED 150', img: 'https://images.unsplash.com/photo-1504326787394-e6d75cae8027?w=400', category: 'Adventure' },
  { id: 'burj-khalifa', code: 'BK001', name: 'Burj Khalifa', price: 'AED 180', img: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5?w=400', category: 'Landmarks' },
  { id: 'dubai-marina-cruise', code: 'DMC01', name: 'Dubai Marina Cruise', price: 'AED 120', img: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba?w=400', category: 'Cruises' },
  { id: 'abu-dhabi-tour', code: 'ADT01', name: 'Abu Dhabi City Tour', price: 'AED 200', img: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490?w=400', category: 'City Tours' },
  { id: 'dubai-frame', code: 'DF001', name: 'Dubai Frame', price: 'AED 75', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=400', category: 'Landmarks' },
  { id: 'aquaventure', code: 'AQ001', name: 'Aquaventure Waterpark', price: 'AED 320', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', category: 'Theme Parks' },
  { id: 'miracle-garden', code: 'MG001', name: 'Dubai Miracle Garden', price: 'AED 100', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', category: 'Attractions' },
  { id: 'global-village', code: 'GV001', name: 'Global Village', price: 'AED 25', img: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=400', category: 'Entertainment' },
  { id: 'ski-dubai', code: 'SD001', name: 'Ski Dubai', price: 'AED 220', img: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400', category: 'Adventure' },
  { id: 'dhow-cruise', code: 'DC001', name: 'Creek Dhow Cruise', price: 'AED 99', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', category: 'Cruises' },
  { id: 'museum-future', code: 'MOF01', name: 'Museum of the Future', price: 'AED 149', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=400', category: 'Museums' },
  { id: 'img-worlds', code: 'IMG01', name: 'IMG Worlds of Adventure', price: 'AED 299', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'palm-jumeirah', code: 'PJ001', name: 'Palm Jumeirah Tour', price: 'AED 150', img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400', category: 'Landmarks' },
  { id: 'deep-dive', code: 'DD001', name: 'Deep Dive Dubai', price: 'AED 400', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', category: 'Adventure' },
  { id: 'ferrari-world', code: 'FW001', name: 'Ferrari World', price: 'AED 350', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'hot-air-balloon', code: 'HAB01', name: 'Hot Air Balloon', price: 'AED 900', img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400', category: 'Adventure' },
  { id: 'yacht-cruise', code: 'YC001', name: 'Luxury Yacht Cruise', price: 'AED 500', img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400', category: 'Cruises' },
  { id: 'helicopter-tour', code: 'HT001', name: 'Helicopter Tour', price: 'AED 650', img: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5?w=400', category: 'Adventure' },
  { id: 'motiongate', code: 'MG002', name: 'Motiongate Dubai', price: 'AED 275', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'legoland', code: 'LL001', name: 'Legoland Dubai', price: 'AED 275', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
  { id: 'quad-biking', code: 'QB001', name: 'Quad Biking', price: 'AED 200', img: 'https://images.unsplash.com/photo-1504326787394-e6d75cae8027?w=400', category: 'Adventure' },
  { id: 'dinner-cruise', code: 'DNC01', name: 'Dinner Cruise', price: 'AED 180', img: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba?w=400', category: 'Cruises' },
  { id: 'louvre-abu-dhabi', code: 'LAD01', name: 'Louvre Abu Dhabi', price: 'AED 150', img: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490?w=400', category: 'Museums' },
  { id: 'warner-bros', code: 'WB001', name: 'Warner Bros World', price: 'AED 325', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Theme Parks' },
];

const categories = ['All', 'Adventure', 'Landmarks', 'Cruises', 'City Tours', 'Theme Parks', 'Attractions', 'Entertainment', 'Museums'];

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white">
      {/* Breadcrumb with Hero Image */}
      <Breadcrumb 
        items={[{ label: 'Dubai Activities & Tours' }]}
        backgroundImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
      />

      {/* Search & Filter Bar */}
      <section className="py-6 px-6 bg-white border-b sticky top-[120px] z-40 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search activities or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none"
              />
            </div>
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0cc0df] text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filteredActivities.length}</span> activities
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all relative group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={activity.img}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                    {activity.category}
                  </div>
                  {/* Code Badge */}
                  <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono">
                    #{activity.code}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{activity.name}</h3>
                  <p className="text-[#0cc0df] font-bold text-sm mb-3">{activity.price}</p>
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20want%20to%20book%20activity%20${activity.code}%20-%20${activity.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full bg-[#0cc0df] text-white text-xs px-4 py-2.5 rounded-full font-medium hover:bg-cyan-600 transition"
                  >
                    <MessageCircle size={14} />
                    Book on WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No activities found</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-[#0cc0df] hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-[#0cc0df] to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-white/90 mb-6">We offer 100+ activities across Dubai and UAE. Contact us for custom packages.</p>
          <a
            href="https://wa.me/971565330500?text=Hi,%20I%20am%20looking%20for%20a%20custom%20activity%20package"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            <MessageCircle size={20} />
            Chat with Us
          </a>
        </div>
      </section>
    </div>
  );
}
