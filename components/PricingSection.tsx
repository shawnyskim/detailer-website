'use client';

import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';
import Button from './ui/Button';

export default function PricingSection() {
  const scrollToApply = () => {
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto max-w-3xl text-center">
        <SectionLabel className="justify-center flex">ONE SIMPLE PRICE</SectionLabel>

        <SectionHeadline>
          30-day free trial, then $199/mo.
        </SectionHeadline>

        <p className="text-2xl text-text-secondary mb-8">
          $299/mo after the first 3 months
        </p>

        <div className="text-lg text-text-secondary mb-8">
          <ul className="space-y-3 max-w-xl mx-auto text-left">
            <li className="flex items-start">
              <span className="text-accent mr-3">•</span>
              <span>Month-to-month, cancel anytime</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">•</span>
              <span>No long-term contracts</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">•</span>
              <span>No cancellation fees</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-3">•</span>
              <span>Everything on the DetailerStack platform included</span>
            </li>
          </ul>
        </div>

        <Button onClick={scrollToApply} className="mb-4">
          Apply for early access
        </Button>

        <p className="text-sm text-accent font-semibold">
          6 spots left
        </p>
      </div>
    </section>
  );
}
