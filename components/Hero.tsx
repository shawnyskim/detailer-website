'use client';

import React from 'react';
import Button from './ui/Button';
import SectionLabel from './ui/SectionLabel';

export default function Hero() {
  const scrollToApply = () => {
    const element = document.getElementById('apply');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-24">
      <div className="container mx-auto text-center">
        <SectionLabel className="justify-center flex">
          FOR CAR DETAILERS
        </SectionLabel>

        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8">
          Websites that book
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-3xl mx-auto mb-10">
          The online presence that fills your calendar—without chasing leads or wasting money on ads.
        </p>

        <div className="flex flex-col items-center">
          <Button onClick={scrollToApply}>
            Apply for early access
          </Button>
          <p className="text-sm text-text-secondary mt-4">
            Accepting 10 founding shops
          </p>
        </div>
      </div>
    </section>
  );
}
