import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-bg-secondary border border-border-color rounded-lg p-8 ${className}`}
    >
      {children}
    </div>
  );
}
