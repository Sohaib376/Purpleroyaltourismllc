'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items, backgroundImage }) {
  return (
    <div className="relative">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Page background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
      )}
      
      {/* Breadcrumb Content */}
      <div className={`relative z-10 ${backgroundImage ? 'py-16 sm:py-20' : 'py-4 bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link 
              href="/" 
              className={`flex items-center gap-1 hover:underline ${backgroundImage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Home size={14} />
              Home
            </Link>
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={14} className={backgroundImage ? 'text-white/50' : 'text-gray-400'} />
                {item.href && index !== items.length - 1 ? (
                  <Link 
                    href={item.href} 
                    className={`hover:underline ${backgroundImage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={backgroundImage ? 'text-white font-medium' : 'text-gray-900 font-medium'}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
          
          {/* Page Title */}
          {backgroundImage && items.length > 0 && (
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {items[items.length - 1].label}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
