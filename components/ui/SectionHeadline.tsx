import React from 'react';

interface SectionHeadlineProps {
  children: React.ReactNode;
  className?: string;
  size?: 'large' | 'medium';
}

export default function SectionHeadline({
  children,
  className = '',
  size = 'large'
}: SectionHeadlineProps) {
  const sizeStyles = {
    large: 'text-4xl md:text-5xl lg:text-6xl',
    medium: 'text-3xl md:text-4xl lg:text-5xl'
  };

  return (
    <h2
      className={`font-bold leading-[1.1] text-text-primary mb-6 ${sizeStyles[size]} ${className}`}
    >
      {children}
    </h2>
  );
}
