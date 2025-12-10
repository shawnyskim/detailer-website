import React from 'react';
import SectionLabel from './ui/SectionLabel';
import SectionHeadline from './ui/SectionHeadline';

export default function ComparisonTable() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <SectionLabel>COMPARE</SectionLabel>

        <SectionHeadline>
          Why this beats the alternatives.
        </SectionHeadline>

        <div className="overflow-x-auto">
          <table className="w-full border border-border-color rounded-lg">
            <thead>
              <tr className="border-b border-border-color">
                <th className="p-4 text-left"></th>
                <th className="p-4 text-center">Generic agency</th>
                <th className="p-4 text-center">DIY (Wix)</th>
                <th className="p-4 text-center bg-bg-secondary">Founding offer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-color">
                <td className="p-4 text-text-secondary">Understands detailing</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">✓</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 text-text-secondary">SEO included</td>
                <td className="p-4 text-center">+$1,500/mo</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">✓</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 text-text-secondary">Time to launch</td>
                <td className="p-4 text-center">6-8 weeks</td>
                <td className="p-4 text-center">You figure it out</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">3 weeks</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 text-text-secondary">Direct founder access</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">✓</td>
              </tr>
              <tr className="border-b border-border-color">
                <td className="p-4 text-text-secondary">Risk-free trial</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center">❌</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">✓</td>
              </tr>
              <tr>
                <td className="p-4 text-text-secondary">Price</td>
                <td className="p-4 text-center">$2K+ setup</td>
                <td className="p-4 text-center">$16/mo + time</td>
                <td className="p-4 text-center bg-bg-secondary text-accent">$199/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
