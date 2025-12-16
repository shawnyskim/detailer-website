import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 ease-out';

  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-[#4f8ff7] hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-transparent border-2 border-border-color text-text-primary hover:border-accent hover:text-accent'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed hover:scale-100';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {children}
    </button>
  );
}
