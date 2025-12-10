import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

export default function OfferSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel>FOUNDING SHOPS</SectionLabel>

        <SectionHeadline>
          Looking for 10 detailers who want to grow.
        </SectionHeadline>

        <p className="text-lg md:text-xl text-text-secondary mb-12">
          We're handpicking the first shops to work with. Not running ads. Not scaling to 500 clients. Just 10 businesses we can actually help.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-border-color rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6">What you get:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Custom website built in 2 weeks (not a template)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Local SEO so you rank for "[service] + [your city]"</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Google Business profile optimization</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Online booking system included</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Review automation that builds your reputation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Direct access to us—not a support ticket</span>
              </li>
            </ul>
          </div>

          <div className="border border-border-color rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6">What we get:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Your honest feedback</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">Permission to use your results as a case study</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
