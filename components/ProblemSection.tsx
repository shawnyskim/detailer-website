'use client';

import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';
import Button from './ui/Button';

export default function ProblemSection() {
  const scrollToApply = () => {
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <SectionLabel>THE REALITY</SectionLabel>

        <SectionHeadline>
          2,035 detailers in LA alone. Most are invisible online.
        </SectionHeadline>

        <div className="text-lg md:text-xl text-text-secondary space-y-4 mb-8">
          <p>
            You're competing against shops with $3K/month ad budgets and SEO agencies on retainer.
          </p>
          <p>
            You're great at detailing. Marketing shouldn't be your second job.
          </p>
          <p className="text-text-primary font-semibold">
            We build the online presence that books your calendar—so you can focus on the work.
          </p>
        </div>

        <Button onClick={scrollToApply}>
          Apply for early access
        </Button>
      </div>
    </section>
  );
}
