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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                Your name
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
                Business name
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
                City
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
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg focus:outline-none focus:border-accent transition-colors text-text-primary placeholder:text-text-secondary"
              />
            </div>

            <div>
              <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                Monthly revenue (rough estimate)
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
                <option value="under-5k">Under $5K</option>
                <option value="5-10k">$5-10K</option>
                <option value="10-20k">$10-20K</option>
                <option value="20-50k">$20-50K</option>
                <option value="50k+">$50K+</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
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
                Phone
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

            <Button type="submit" className="w-full">
              Submit application
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
