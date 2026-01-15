// Sample data for the tourism website

export const services = [
  {
    id: 'international-visa',
    title: 'International Visa',
    description: 'Get your visa for UK, USA, Schengen, and 50+ countries',
    icon: 'Globe',
    href: '/visa/international'
  },
  {
    id: 'uae-visa',
    title: 'UAE Visa',
    description: 'Tourist, transit, and extension visas for UAE',
    icon: 'FileText',
    href: '/visa/uae'
  },
  {
    id: 'umrah',
    title: 'Umrah Packages',
    description: 'Affordable Umrah packages with premium hotels',
    icon: 'Star',
    href: '/umrah'
  },
  {
    id: 'activities',
    title: 'Dubai Activities',
    description: 'Desert Safari, Burj Khalifa, and 40+ attractions',
    icon: 'Compass',
    href: '/activities'
  },
  {
    id: 'insurance',
    title: 'Travel Insurance',
    description: 'Comprehensive travel insurance for worry-free trips',
    icon: 'Shield',
    href: '/insurance'
  }
];

export const internationalVisas = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', processingTime: '15-20 days', price: 'AED 850' },
  { id: 'usa', name: 'United States', flag: '🇺🇸', processingTime: '3-5 weeks', price: 'AED 750' },
  { id: 'schengen', name: 'Schengen', flag: '🇪🇺', processingTime: '10-15 days', price: 'AED 450' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦', processingTime: '20-30 days', price: 'AED 650' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', processingTime: '15-25 days', price: 'AED 700' },
  { id: 'turkey', name: 'Turkey', flag: '🇹🇷', processingTime: '3-5 days', price: 'AED 350' },
  { id: 'thailand', name: 'Thailand', flag: '🇹🇭', processingTime: '3-5 days', price: 'AED 250' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', processingTime: '5-7 days', price: 'AED 300' },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', processingTime: '5-7 days', price: 'AED 400' },
  { id: 'china', name: 'China', flag: '🇨🇳', processingTime: '7-10 days', price: 'AED 550' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', processingTime: '5-7 days', price: 'AED 450' },
  { id: 'egypt', name: 'Egypt', flag: '🇪🇬', processingTime: '3-5 days', price: 'AED 200' }
];

export const uaeVisas = [
  { id: '14-day', name: '14-Day Tourist Visa', price: 'AED 350', validity: '14 days', processingTime: '24-48 hours' },
  { id: '30-day', name: '30-Day Tourist Visa', price: 'AED 450', validity: '30 days', processingTime: '24-48 hours' },
  { id: '60-day', name: '60-Day Tourist Visa', price: 'AED 850', validity: '60 days', processingTime: '24-48 hours' },
  { id: '90-day', name: '90-Day Tourist Visa', price: 'AED 1200', validity: '90 days', processingTime: '2-3 days' },
  { id: 'transit', name: 'Transit Visa (96 hrs)', price: 'AED 200', validity: '96 hours', processingTime: 'Same day' },
  { id: 'extension', name: 'Visa Extension', price: 'AED 900', validity: '30 days', processingTime: '2-3 days' }
];

export const umrahPackages = [
  {
    id: '7-day-economy',
    name: '7-Day Economy Package',
    price: 'AED 4,500',
    duration: '7 Days / 6 Nights',
    hotel: '3-Star Hotels',
    includes: ['Return Flights', 'Visa', 'Transport', 'Guide'],
    image: 'https://images.unsplash.com/photo-1665308100392-5ab46e8f5fb9'
  },
  {
    id: '10-day-standard',
    name: '10-Day Standard Package',
    price: 'AED 6,500',
    duration: '10 Days / 9 Nights',
    hotel: '4-Star Hotels',
    includes: ['Return Flights', 'Visa', 'Transport', 'Guide', 'Meals'],
    image: 'https://images.unsplash.com/photo-1565828480412-f95f33fe9e70'
  },
  {
    id: '14-day-premium',
    name: '14-Day Premium Package',
    price: 'AED 12,000',
    duration: '14 Days / 13 Nights',
    hotel: '5-Star Hotels',
    includes: ['Business Class Flights', 'Visa', 'Private Transport', 'Personal Guide', 'All Meals'],
    image: 'https://images.unsplash.com/photo-1665308100392-5ab46e8f5fb9'
  },
  {
    id: 'ramadan-special',
    name: 'Ramadan Special Package',
    price: 'AED 8,500',
    duration: '10 Days / 9 Nights',
    hotel: '4-Star Hotels (Near Haram)',
    includes: ['Return Flights', 'Visa', 'Transport', 'Guide', 'Iftar & Suhoor'],
    image: 'https://images.unsplash.com/photo-1565828480412-f95f33fe9e70'
  }
];

export const activities = [
  {
    id: 'desert-safari',
    name: 'Desert Safari',
    price: 'AED 150',
    duration: '6 hours',
    description: 'Experience the thrill of dune bashing, camel rides, BBQ dinner, and entertainment',
    image: 'https://images.unsplash.com/photo-1504326787394-e6d75cae8027',
    category: 'Adventure'
  },
  {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    price: 'AED 180',
    duration: '2 hours',
    description: 'Visit the observation deck of the world\'s tallest building',
    image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5',
    category: 'Landmarks'
  },
  {
    id: 'dubai-marina-cruise',
    name: 'Dubai Marina Cruise',
    price: 'AED 120',
    duration: '2 hours',
    description: 'Luxury dhow cruise with dinner and stunning marina views',
    image: 'https://images.unsplash.com/photo-1598343530164-8f8922e123ba',
    category: 'Cruises'
  },
  {
    id: 'abu-dhabi-tour',
    name: 'Abu Dhabi City Tour',
    price: 'AED 200',
    duration: '10 hours',
    description: 'Visit Sheikh Zayed Mosque, Emirates Palace, and more',
    image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490',
    category: 'City Tours'
  },
  {
    id: 'dubai-frame',
    name: 'Dubai Frame',
    price: 'AED 75',
    duration: '1.5 hours',
    description: 'Experience the iconic Dubai Frame with panoramic views',
    image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5',
    category: 'Landmarks'
  },
  {
    id: 'aquaventure',
    name: 'Aquaventure Waterpark',
    price: 'AED 320',
    duration: 'Full day',
    description: 'The largest waterpark in the Middle East with thrilling rides',
    image: 'https://images.unsplash.com/photo-1584546459262-0ddde08da490',
    category: 'Theme Parks'
  }
];

export const whyChooseUs = [
  { title: 'Government Approved', description: 'Licensed and registered tourism agency in UAE', icon: 'BadgeCheck' },
  { title: 'Best Price Guarantee', description: 'Competitive pricing with no hidden charges', icon: 'DollarSign' },
  { title: '24/7 Support', description: 'Round-the-clock customer service via WhatsApp', icon: 'Headphones' },
  { title: 'Fast Processing', description: 'Quick visa processing with real-time updates', icon: 'Zap' },
  { title: '10+ Years Experience', description: 'Trusted by thousands of travelers worldwide', icon: 'Award' },
  { title: 'Secure Payments', description: 'Multiple payment options with secure checkout', icon: 'Lock' }
];

export const blogPosts = [
  {
    id: '1',
    slug: 'complete-guide-uk-visa',
    title: 'Complete Guide to UK Visa Application in 2024',
    excerpt: 'Everything you need to know about applying for a UK visa from UAE...',
    category: 'Visa Tips',
    image: 'https://images.unsplash.com/photo-1654163601053-ea0362be3429',
    createdAt: '2024-12-15',
    published: true
  },
  {
    id: '2',
    slug: 'top-10-dubai-attractions',
    title: 'Top 10 Must-Visit Attractions in Dubai',
    excerpt: 'Discover the best places to visit in Dubai for an unforgettable experience...',
    category: 'Travel Tips',
    image: 'https://images.unsplash.com/photo-1583759604327-f9dcd23499d5',
    createdAt: '2024-12-10',
    published: true
  },
  {
    id: '3',
    slug: 'umrah-guide-beginners',
    title: 'First-Time Umrah Guide: What to Expect',
    excerpt: 'A comprehensive guide for those performing Umrah for the first time...',
    category: 'Umrah',
    image: 'https://images.unsplash.com/photo-1665308100392-5ab46e8f5fb9',
    createdAt: '2024-12-05',
    published: true
  }
];
