import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`text-xs md:text-sm uppercase tracking-[0.1em] text-text-secondary font-semibold mb-4 ${className}`}
    >
      {children}
    </div>
  );
}
