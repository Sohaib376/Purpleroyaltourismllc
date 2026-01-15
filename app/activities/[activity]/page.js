'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, MapPin, MessageCircle, Star } from 'lucide-react';
import { activities } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const allActivities = [
  ...activities,
  { id: 'miracle-garden', name: 'Dubai Miracle Garden', price: 'AED 100', duration: '2-3 hours', description: 'World\'s largest natural flower garden with amazing floral displays', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Attractions' },
  { id: 'global-village', name: 'Global Village', price: 'AED 25', duration: '4-5 hours', description: 'Multi-cultural family destination with shopping, entertainment, and food', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', category: 'Entertainment' },
  { id: 'ski-dubai', name: 'Ski Dubai', price: 'AED 220', duration: '2 hours', description: 'Indoor ski resort in Mall of Emirates with real snow', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Adventure' },
  { id: 'dhow-cruise', name: 'Creek Dhow Cruise', price: 'AED 99', duration: '2 hours', description: 'Traditional dhow cruise along Dubai Creek with dinner', image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba', category: 'Cruises' },
  { id: 'museum-future', name: 'Museum of the Future', price: 'AED 149', duration: '2-3 hours', description: 'Iconic museum showcasing futuristic innovations and experiences', image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5', category: 'Museums' },
  { id: 'img-worlds', name: 'IMG Worlds of Adventure', price: 'AED 299', duration: 'Full day', description: 'Largest indoor theme park with Marvel, Cartoon Network zones', image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490', category: 'Theme Parks' }
];

const activityIncludes = {
  'desert-safari': ['Hotel pickup & drop-off', 'Dune bashing in 4x4', 'Camel ride', 'Sandboarding', 'BBQ dinner with live entertainment', 'Henna painting', 'Arabic coffee & dates'],
  'burj-khalifa': ['Skip-the-line ticket', 'Access to observation deck (Level 124 & 125)', 'Multimedia presentation', 'Interactive screens', 'Telescopes for city views'],
  'dubai-marina-cruise': ['2-hour cruise', 'Welcome drinks', 'International buffet dinner', 'Live entertainment', 'Stunning marina views'],
  'abu-dhabi-tour': ['Hotel pickup & drop-off', 'Sheikh Zayed Grand Mosque visit', 'Emirates Palace photo stop', 'Heritage Village', 'Corniche drive', 'Date Market visit']
};

const defaultIncludes = ['Tickets included', 'Skip the line access', 'Free cancellation up to 24 hours', 'Mobile voucher accepted'];

export default function ActivityDetailPage() {
  const params = useParams();
  const activityId = params.activity;
  
  const activity = allActivities.find(a => a.id === activityId);
  const includes = activityIncludes[activityId] || defaultIncludes;

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activity not found</h1>
          <Link href="/activities" className="text-[#0cc0df] hover:underline">
            Back to all activities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft size={18} />
              Back to activities
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <span className="inline-block bg-[#0cc0df] text-white text-sm px-3 py-1 rounded mb-3">
                {activity.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{activity.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-1">
                  <Clock size={18} />
                  {activity.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={18} />
                  Dubai, UAE
                </span>
                <span className="flex items-center gap-1">
                  <Star size={18} fill="gold" className="text-yellow-400" />
                  4.8 (500+ reviews)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
                <p className="text-gray-600 leading-relaxed">
                  {activity.description} This is one of the most popular activities in Dubai, offering an unforgettable experience for visitors of all ages. Perfect for families, couples, and solo travelers looking to explore the best of what Dubai has to offer.
                </p>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Information</h2>
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <p className="text-gray-700"><strong>Meeting Point:</strong> Hotel pickup available or meet at venue</p>
                  <p className="text-gray-700"><strong>What to Bring:</strong> Comfortable clothing, camera, valid ID</p>
                  <p className="text-gray-700"><strong>Not Suitable For:</strong> Varies by activity - contact us for details</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-sm text-gray-500 mb-1">From</div>
                  <div className="text-3xl font-bold text-[#0cc0df] mb-2">{activity.price}</div>
                  <p className="text-sm text-gray-500 mb-6">per person</p>
                  
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20want%20to%20book%20${activity.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors mb-3"
                  >
                    <MessageCircle size={18} />
                    Book via WhatsApp
                  </a>
                  <p className="text-xs text-gray-500 text-center">Instant confirmation</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Enquire Now</h3>
                  <ContactForm source={`activity-${activityId}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
