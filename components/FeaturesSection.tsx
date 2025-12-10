import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

const features = [
  {
    title: 'Custom website',
    description: 'Fast, mobile-first, built to convert. Not a Wix template.'
  },
  {
    title: 'Local SEO',
    description: 'Rank for "ceramic coating [your city]" without paying for every click.'
  },
  {
    title: 'Google Business',
    description: 'Optimized so you show up in the map pack.'
  },
  {
    title: 'Online booking',
    description: 'Customers book themselves. No more phone tag.'
  },
  {
    title: 'Review automation',
    description: 'Follow-ups that turn jobs into 5-star reviews.'
  },
  {
    title: 'Monthly report',
    description: 'See what\'s working. No vanity metrics.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <SectionLabel>EVERYTHING YOU NEED</SectionLabel>

        <SectionHeadline>
          One package with everything you need
        </SectionHeadline>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border border-border-color rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
