import React from 'react';

const stats = [
  {
    number: '58%',
    description: 'of detailing leads come from Google'
  },
  {
    number: '78%',
    description: 'of local searches book within 24 hours'
  },
  {
    number: '$50-100',
    description: 'per click on ads most detailers can\'t afford'
  }
];

export default function StatsBar() {
  return (
    <section className="section-padding border-t border-b border-border-color">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-3">
                {stat.number}
              </div>
              <p className="text-text-secondary text-base md:text-lg">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
