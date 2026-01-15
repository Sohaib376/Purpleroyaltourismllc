'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { activities } from '@/lib/data';

// Extended activities list
const allActivities = [
  ...activities,
  { id: 'miracle-garden', name: 'Dubai Miracle Garden', price: 'AED 100', duration: '2-3 hours', description: 'World\'s largest natural flower garden with amazing floral displays', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Attractions' },
  { id: 'global-village', name: 'Global Village', price: 'AED 25', duration: '4-5 hours', description: 'Multi-cultural family destination with shopping, entertainment, and food', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', category: 'Entertainment' },
  { id: 'ski-dubai', name: 'Ski Dubai', price: 'AED 220', duration: '2 hours', description: 'Indoor ski resort in Mall of Emirates with real snow', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Adventure' },
  { id: 'dhow-cruise', name: 'Creek Dhow Cruise', price: 'AED 99', duration: '2 hours', description: 'Traditional dhow cruise along Dubai Creek with dinner', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', category: 'Cruises' },
  { id: 'museum-future', name: 'Museum of the Future', price: 'AED 149', duration: '2-3 hours', description: 'Iconic museum showcasing futuristic innovations and experiences', image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5', category: 'Museums' },
  { id: 'img-worlds', name: 'IMG Worlds of Adventure', price: 'AED 299', duration: 'Full day', description: 'Largest indoor theme park with Marvel, Cartoon Network zones', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Theme Parks' }
];

const categories = ['All', 'Adventure', 'Landmarks', 'Cruises', 'City Tours', 'Theme Parks', 'Attractions', 'Entertainment', 'Museums'];

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dubai Activities & Tours</h1>
            <p className="text-lg text-white/90 mb-8">
              Discover the best of Dubai with our curated collection of tours, attractions, and unforgettable experiences.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#0cc0df] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
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
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock size={14} />
                        {activity.duration}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-[#0cc0df] mt-3">
                      Book Now <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No activities found</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-[#0cc0df] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
