import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

export default function CredibilitySection() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <SectionLabel>WHO'S BEHIND THIS</SectionLabel>

        <SectionHeadline>
          Built by a team that's done this at scale.
        </SectionHeadline>

        <div className="text-lg md:text-xl text-text-secondary mb-12">
          <p>
            We've led product and growth at brands like MeUndies, LegalZoom, and Walmart—and bootstrapped multiple SaaS companies to seven-figure exits. Between us, we've spent over a decade building systems that drive revenue, automate operations, and convert browsers into buyers. Now we're applying that to car detailers so that you can focus on what you do best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-6 border border-border-color rounded-lg p-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold flex-shrink-0">
              S
            </div>
            <div>
              <div className="font-semibold text-lg">Shawn</div>
              <div className="text-text-secondary text-sm">CRO and Growth Expert</div>
            </div>
          </div>

          <div className="flex items-center gap-6 border border-border-color rounded-lg p-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold flex-shrink-0">
              A
            </div>
            <div>
              <div className="font-semibold text-lg">Amos</div>
              <div className="text-text-secondary text-sm">Bootstrapped and sold 2 SaaS businesses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
