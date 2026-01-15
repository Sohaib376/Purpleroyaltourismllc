'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Calendar, Star, MapPin, MessageCircle } from 'lucide-react';
import { umrahPackages } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const packageDetails = {
  '7-day-economy': {
    itinerary: [
      { day: 1, title: 'Departure from Dubai', desc: 'Flight to Jeddah, transfer to Makkah' },
      { day: 2, title: 'Umrah Performance', desc: 'Perform Umrah rituals with guide' },
      { day: 3, title: 'Makkah Stay', desc: 'Prayers at Masjid al-Haram' },
      { day: 4, title: 'Makkah to Madinah', desc: 'Travel to Madinah by bus' },
      { day: 5, title: 'Madinah Visit', desc: 'Visit Masjid an-Nabawi and Rawdah' },
      { day: 6, title: 'Ziyarat Tour', desc: 'Visit historical sites in Madinah' },
      { day: 7, title: 'Return to Dubai', desc: 'Flight back from Madinah' }
    ],
    hotels: ['3-Star hotel in Makkah (500m from Haram)', '3-Star hotel in Madinah (300m from Masjid Nabawi)']
  },
  '10-day-standard': {
    itinerary: [
      { day: 1, title: 'Departure from Dubai', desc: 'Flight to Jeddah, transfer to Makkah' },
      { day: '2-3', title: 'Umrah & Makkah', desc: 'Perform Umrah and prayers at Haram' },
      { day: '4-5', title: 'Makkah Stay', desc: 'Additional prayers and rest' },
      { day: 6, title: 'Travel to Madinah', desc: 'Comfortable bus journey' },
      { day: '7-9', title: 'Madinah Stay', desc: 'Prayers and Ziyarat tours' },
      { day: 10, title: 'Return to Dubai', desc: 'Flight back from Madinah' }
    ],
    hotels: ['4-Star hotel in Makkah (200m from Haram)', '4-Star hotel in Madinah (100m from Masjid Nabawi)']
  }
};

const defaultDetails = {
  itinerary: [
    { day: 1, title: 'Departure', desc: 'Flight to Saudi Arabia' },
    { day: '2-4', title: 'Makkah', desc: 'Umrah and prayers' },
    { day: '5-7', title: 'Madinah', desc: 'Visit and prayers' },
    { day: 'Last', title: 'Return', desc: 'Flight back to Dubai' }
  ],
  hotels: ['Quality hotels near Haram', 'Quality hotels near Masjid Nabawi']
};

export default function UmrahPackageDetailPage() {
  const params = useParams();
  const packageId = params.package;
  
  const pkg = umrahPackages.find(p => p.id === packageId);
  const details = packageDetails[packageId] || defaultDetails;

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h1>
          <Link href="/umrah" className="text-[#0cc0df] hover:underline">
            Back to all packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[400px]">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <Link
              href="/umrah"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft size={18} />
              Back to packages
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{pkg.name}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <span className="flex items-center gap-1"><Calendar size={18} />{pkg.duration}</span>
              <span className="flex items-center gap-1"><Star size={18} />{pkg.hotel}</span>
              <span className="flex items-center gap-1"><MapPin size={18} />Makkah & Madinah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Includes */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Includes</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hotels */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Accommodation</h2>
                <ul className="space-y-3">
                  {details.hotels.map((hotel, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Star className="text-yellow-500" size={18} />
                      <span className="text-gray-700">{hotel}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {details.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-16 bg-[#0cc0df]/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-500">Day</span>
                        <span className="font-bold text-[#0cc0df]">{item.day}</span>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-sm text-gray-500 mb-1">Package Price</div>
                  <div className="text-3xl font-bold text-[#0cc0df] mb-4">{pkg.price}</div>
                  <p className="text-sm text-gray-500 mb-6">per person (sharing basis)</p>
                  <a
                    href={`https://wa.me/971565330500?text=Hi,%20I%20want%20to%20book%20${pkg.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle size={18} />
                    Book via WhatsApp
                  </a>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">Request Quote</h3>
                  <ContactForm source={`umrah-${packageId}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
