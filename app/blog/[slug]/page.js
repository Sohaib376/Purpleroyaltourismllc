'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, MessageCircle } from 'lucide-react';
import { blogPosts as samplePosts } from '@/lib/data';

const fullContent = {
  'complete-guide-uk-visa': `
    <p>Planning to visit the United Kingdom from the UAE? This comprehensive guide covers everything you need to know about the UK visa application process.</p>
    
    <h2>Types of UK Visas</h2>
    <p>The most common visa for tourists and business visitors is the Standard Visitor Visa, which allows you to stay in the UK for up to 6 months.</p>
    
    <h2>Required Documents</h2>
    <ul>
      <li>Valid passport with at least 6 months validity</li>
      <li>Recent passport-sized photographs</li>
      <li>Bank statements for the last 6 months</li>
      <li>Employment letter stating your salary and position</li>
      <li>Travel itinerary and accommodation booking</li>
      <li>Travel insurance coverage</li>
    </ul>
    
    <h2>Application Process</h2>
    <p>The application is submitted online through the official UK visa website. After completing the online form, you'll need to book an appointment at VFS Global for biometrics.</p>
    
    <h2>Processing Time</h2>
    <p>Standard processing takes 15-20 working days. Priority services are available for faster processing.</p>
    
    <h2>Tips for Success</h2>
    <p>Ensure all documents are clear and complete. Strong financial proof and clear travel purpose significantly improve approval chances.</p>
  `,
  'top-10-dubai-attractions': `
    <p>Dubai is a city of superlatives, home to some of the world's most incredible attractions. Here are the top 10 must-visit places.</p>
    
    <h2>1. Burj Khalifa</h2>
    <p>The world's tallest building offers breathtaking views from its observation decks on levels 124 and 148.</p>
    
    <h2>2. Dubai Mall</h2>
    <p>One of the largest shopping malls globally, featuring an aquarium, ice rink, and endless shopping options.</p>
    
    <h2>3. Palm Jumeirah</h2>
    <p>This iconic man-made island shaped like a palm tree is home to luxury resorts and Atlantis The Palm.</p>
    
    <h2>4. Desert Safari</h2>
    <p>Experience dune bashing, camel rides, and traditional BBQ dinner under the stars.</p>
    
    <h2>5. Dubai Frame</h2>
    <p>A 150-meter tall structure offering views of old and new Dubai.</p>
  `,
  'umrah-guide-beginners': `
    <p>Performing Umrah for the first time is a deeply spiritual experience. This guide will help you prepare for this blessed journey.</p>
    
    <h2>What is Umrah?</h2>
    <p>Umrah is the lesser pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.</p>
    
    <h2>Prerequisites</h2>
    <ul>
      <li>Be Muslim</li>
      <li>Be in a state of physical and mental health</li>
      <li>Have financial means for the journey</li>
      <li>Women must have a mahram (male guardian)</li>
    </ul>
    
    <h2>The Rituals of Umrah</h2>
    <p>Umrah consists of four main rituals: Ihram (sacred state), Tawaf (circling the Kaaba), Sa'i (walking between Safa and Marwa), and Halq/Taqsir (cutting hair).</p>
    
    <h2>What to Pack</h2>
    <p>Comfortable walking shoes, Ihram garments, prayer essentials, and personal medications.</p>
  `
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        // Fallback to sample data
        const samplePost = samplePosts.find(p => p.slug === slug);
        if (samplePost) {
          setPost({ ...samplePost, content: fullContent[slug] || '<p>Content coming soon...</p>' });
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      const samplePost = samplePosts.find(p => p.slug === slug);
      if (samplePost) {
        setPost({ ...samplePost, content: fullContent[slug] || '<p>Content coming soon...</p>' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#0cc0df] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#0cc0df] hover:underline">
            Back to blog
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
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft size={18} />
              Back to blog
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block bg-[#0cc0df] text-white text-sm px-3 py-1 rounded mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {post.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={16} />
                  {post.category}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#0cc0df]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help With Your Travel Plans?</h3>
              <p className="text-gray-600 mb-4">Our team is ready to assist you with visa applications, bookings, and travel advice.</p>
              <a
                href="https://wa.me/971565330500?text=Hi,%20I%20have%20a%20question%20about%20travel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={18} />
                Chat with Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: post.image,
            datePublished: post.createdAt,
            author: {
              '@type': 'Organization',
              name: 'Purple Royal Tourism'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Purple Royal Tourism',
              logo: {
                '@type': 'ImageObject',
                url: 'https://purpleroyaltourism.com/logo.png'
              }
            },
            description: post.excerpt
          })
        }}
      />
    </div>
  );
}
