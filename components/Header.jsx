'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Visas',
    href: '#',
    children: [
      { name: 'International Visas', href: '/visa/international' },
      { name: 'UAE Visas', href: '/visa/uae' },
    ],
  },
  { name: 'Umrah', href: '/umrah' },
  { name: 'Activities', href: '/activities' },
  { name: 'Insurance', href: '/insurance' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#0cc0df] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+971565330500" className="flex items-center gap-1 hover:underline">
              <Phone size={14} />
              +971 56 533 0500
            </a>
            <a href="mailto:info@purpleroyaltourism.com" className="hidden sm:flex items-center gap-1 hover:underline">
              <Mail size={14} />
              info@purpleroyaltourism.com
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            Government Approved Tourism Agency
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="https://purpleroyaltourism.com/wp-content/uploads/2024/07/SIGH-148-x-40-px.svg" 
              alt="Purple Royal Tourism" 
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 text-gray-700 hover:text-[#0cc0df] transition-colors font-medium">
                      {item.name}
                      <ChevronDown size={16} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#0cc0df]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#0cc0df] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/971565330500?text=Hi,%20I%20need%20assistance%20with%20visa%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0cc0df] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#0ab0cd] transition-colors"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="py-2">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="pl-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-gray-600 hover:text-[#0cc0df]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-[#0cc0df] font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20need%20assistance%20with%20visa%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-[#0cc0df] text-white px-6 py-3 rounded-lg font-medium text-center"
              >
                Get Free Quote
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
