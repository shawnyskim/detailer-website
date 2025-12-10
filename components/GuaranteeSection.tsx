'use client';

import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';
import Card from './ui/Card';
import Button from './ui/Button';

export default function GuaranteeSection() {
  const scrollToApply = () => {
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel>THE DEAL</SectionLabel>

        <SectionHeadline>
          Try it free. Don't pay if it doesn't work.
        </SectionHeadline>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <h3 className="text-2xl font-semibold mb-4">30-day free trial</h3>
            <p className="text-text-secondary">
              Your website goes live. You see exactly what you're getting before you pay a dime.
            </p>
          </Card>

          <Card>
            <h3 className="text-2xl font-semibold mb-4">60-day guarantee</h3>
            <p className="text-text-secondary">
              If you don't see more leads in 60 days, we refund you. No questions. No hassle.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xl text-text-secondary mb-8">
            We're betting on our work. You're risking nothing.
          </p>
          <Button onClick={scrollToApply}>
            Apply for early access
          </Button>
        </div>
      </div>
    </section>
  );
}
