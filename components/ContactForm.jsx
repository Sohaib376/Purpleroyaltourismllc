'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm({ source = 'homepage' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    travelDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSuccess(true);
      setFormData({ name: '', phone: '', service: '', travelDate: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We&apos;ve received your inquiry. Our team will contact you within 24 hours.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-[#0cc0df] hover:underline"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none transition-all"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none transition-all"
          placeholder="+971 XX XXX XXXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Required *</label>
        <select
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none transition-all"
        >
          <option value="">Select a service</option>
          <option value="international-visa">International Visa</option>
          <option value="uae-visa">UAE Visa</option>
          <option value="umrah">Umrah Packages</option>
          <option value="activities">Dubai Activities</option>
          <option value="insurance">Travel Insurance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
        <input
          type="date"
          value={formData.travelDate}
          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent outline-none transition-all"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0cc0df] text-white py-3 rounded-lg font-medium hover:bg-[#0ab0cd] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          'Submitting...'
        ) : (
          <>
            <Send size={18} />
            Get Free Consultation
          </>
        )}
      </button>
    </form>
  );
}
