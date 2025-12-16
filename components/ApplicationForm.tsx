'use client';

import React, { useState } from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';
import Button from './ui/Button';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    city: '',
    website: '',
    revenue: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Normalize website URL - add https:// if not present
      const normalizedData = {
        ...formData,
        website: formData.website && !formData.website.match(/^https?:\/\//)
          ? `https://${formData.website}`
          : formData.website
      };

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          businessName: '',
          city: '',
          website: '',
          revenue: '',
          email: '',
          phone: ''
        });
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="section-padding bg-bg-secondary">
      <div className="container mx-auto max-w-2xl">
        <SectionLabel>APPLY</SectionLabel>

        <SectionHeadline>
          10 spots. First come, first served.
        </SectionHeadline>

        <p className="text-lg text-text-secondary mb-12">
          We're not taking everyone. If you're serious about growing and open to giving feedback, apply below.
        </p>

        {submitted ? (
          <div className="bg-accent/10 border border-accent rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-accent">Thanks! We'll be in touch within 24 hours.</h3>
            <p className="text-text-secondary">Your application has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your name<span className="text-accent ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium mb-2">
                Business name<span className="text-accent ml-1">*</span>
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                City<span className="text-accent ml-1">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Current website URL (if any)
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="example.com or www.example.com"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary placeholder:text-text-secondary"
              />
            </div>

            <div>
              <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                Monthly revenue (rough estimate)<span className="text-accent ml-1">*</span>
              </label>
              <select
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              >
                <option value="">Select range...</option>
                <option value="Under $5K">Under $5K</option>
                <option value="$5-10K">$5-10K</option>
                <option value="$10-20K">$10-20K</option>
                <option value="$20-50K">$20-50K</option>
                <option value="$50K+">$50K+</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email<span className="text-accent ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone<span className="text-accent ml-1">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Book my spot'}
            </Button>

            <p className="text-sm text-text-secondary text-center">
              We'll respond within 24 hours.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
