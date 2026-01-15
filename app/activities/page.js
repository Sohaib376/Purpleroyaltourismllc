'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Clock, MapPin } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const categories = ['All', 'Adventure', 'Landmarks', 'Cruises', 'City Tours', 'Theme Parks', 'Attractions', 'Entertainment', 'Museums'];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [selectedCategory]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') {
        params.set('category', selectedCategory);
      }
      
      const response = await fetch(`/api/activities?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Seed activities if none exist
  useEffect(() => {
    const seedIfEmpty = async () => {
      try {
        const response = await fetch('/api/admin/seed-activities');
        const data = await response.json();
        if (data.count > 0) {
          fetchActivities();
        }
      } catch (error) {
        console.error('Error seeding:', error);
      }
    };
    seedIfEmpty();
  }, []);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tour_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
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
                placeholder="Search activities, tour code, or tags..."
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

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id || activity._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all relative group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={activity.image_url || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-2.5 py-1 rounded-full font-medium">
                      {activity.category}
                    </div>
                    {/* Featured Badge */}
                    {activity.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-1">{activity.title}</h3>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      {activity.duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {activity.duration}
                        </span>
                      )}
                      {activity.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {activity.location}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[#0cc0df] font-bold text-sm mb-3">{activity.price}</p>
                    
                    <a
                      href={activity.whatsapp_link || `https://wa.me/971565330500?text=Hi,%20I%20want%20to%20book%20activity%20${activity.tour_code}%20-%20${activity.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-xs px-4 py-2.5 rounded-full font-medium hover:bg-[#20bd5a] transition"
                    >
                      <WhatsAppIcon size={16} />
                      Book on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredActivities.length === 0 && (
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
