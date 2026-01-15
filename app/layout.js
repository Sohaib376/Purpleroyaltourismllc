import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  title: 'Purple Royal Tourism | Visa Services, Umrah Packages & Dubai Activities',
  description: 'Government approved tourism agency in Dubai offering visa services for UK, USA, Schengen, UAE. Premium Umrah packages and exciting Dubai activities. Get your visa with fast processing and 24/7 support.',
  keywords: 'visa services dubai, umrah packages, dubai activities, uae visa, uk visa dubai, schengen visa, travel agency dubai',
  openGraph: {
    title: 'Purple Royal Tourism | Your Trusted Travel Partner in Dubai',
    description: 'Get visas for 50+ countries, affordable Umrah packages, and book exciting Dubai activities. Government approved agency with 10+ years experience.',
    url: 'https://purpleroyaltourism.com',
    siteName: 'Purple Royal Tourism',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Purple Royal Tourism',
              image: 'https://purpleroyaltourism.com/logo.png',
              '@id': 'https://purpleroyaltourism.com',
              url: 'https://purpleroyaltourism.com',
              telephone: '+971565330500',
              email: 'info@purpleroyaltourism.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'CBD Bank Building, Sharaf DG Metro Exit 1, Office No 12, 3rd Floor',
                addressLocality: 'Al Mankhool',
                addressRegion: 'Dubai',
                addressCountry: 'AE',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '21:00',
              },
              sameAs: [
                'https://www.facebook.com/purpleroyaltourism',
                'https://www.instagram.com/purpleroyaltourism',
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
