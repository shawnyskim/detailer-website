import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

export default function QualifierSection() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel>IS THIS FOR YOU?</SectionLabel>

        <SectionHeadline>
          This is for detailers who are ready for more leads.
        </SectionHeadline>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-border-color rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-accent">This is for you if:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">You've wasted money on ads that attracted tire-kickers</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">You're tired of inconsistent bookings</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3">→</span>
                <span className="text-text-secondary">You know you're losing potential leads</span>
              </li>
            </ul>
          </div>

          <div className="border border-border-color rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-red-500">This is NOT for you if:</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-3">→</span>
                <span className="text-text-secondary">You're not ready to invest in growth</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">→</span>
                <span className="text-text-secondary">You're looking for a $20/month DIY solution</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">→</span>
                <span className="text-text-secondary">You don't want to be a case study</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
