import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'International Visas', href: '/visa/international' },
    { name: 'UAE Visas', href: '/visa/uae' },
    { name: 'Umrah Packages', href: '/umrah' },
    { name: 'Dubai Activities', href: '/activities' },
    { name: 'Travel Insurance', href: '/insurance' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/policy' },
  ],
  popular: [
    { name: 'UK Visa', href: '/visa/international/uk' },
    { name: 'USA Visa', href: '/visa/international/usa' },
    { name: 'Schengen Visa', href: '/visa/international/schengen' },
    { name: 'Desert Safari', href: '/activities/desert-safari' },
    { name: 'Burj Khalifa', href: '/activities/burj-khalifa' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="https://purpleroyaltourism.com/wp-content/uploads/2024/07/SIGH-148-x-40-px.svg" 
                alt="Purple Royal Tourism" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for visa services, Umrah packages, and unforgettable Dubai experiences.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+971565330500" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Phone size={16} />
                +971 56 533 0500
              </a>
              <a href="mailto:info@purpleroyaltourism.com" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Mail size={16} />
                info@purpleroyaltourism.com
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span>CBD Bank Building, Sharaf DG Metro Exit 1, Office No 12, 3rd Floor, Al Mankhool, Dubai</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#0cc0df] text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#0cc0df] text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Services</h3>
            <ul className="space-y-2">
              {footerLinks.popular.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#0cc0df] text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0cc0df] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0cc0df] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0cc0df] transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Purple Royal Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
