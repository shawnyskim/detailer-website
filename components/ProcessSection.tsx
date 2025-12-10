import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

const steps = [
  {
    title: 'Week 1 → Discovery',
    description: 'We audit your current site, competitors, and the keywords that matter in your market.'
  },
  {
    title: 'Week 2 → Build',
    description: 'Your custom site goes live with booking, SEO, and Google Business optimization baked in.'
  },
  {
    title: 'Weeks 3-8 → Growth',
    description: 'We turn on review automation, remarketing, and track what\'s driving leads.'
  },
  {
    title: '30 days live → Results',
    description: 'You\'re getting more leads, or you get your money back.'
  }
];

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <SectionLabel>HOW IT WORKS</SectionLabel>

        <SectionHeadline>
          Live in 3 weeks.
        </SectionHeadline>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 pb-8 border-b border-border-color last:border-b-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
