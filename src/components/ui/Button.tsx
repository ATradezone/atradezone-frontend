'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e?: React.FormEvent | React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  style
}: ButtonProps) => {
  // Base classes
  let classes = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant classes - Updated to match SupplierModal button design
  if (variant === 'primary') {
    classes += ' btn-inverted-green px-4 py-2 rounded-full hover:opacity-90 transition-opacity font-medium';
  } else if (variant === 'secondary') {
    classes += ' px-4 py-2 border border-[#080d1a] rounded-full text-gray-80 hover:bg-gray-50 font-afacad';
  } else if (variant === 'outline') {
    classes += ' px-4 py-2 border border-gray-300 rounded-full text-gray-80 hover:bg-gray-50';
  }
  
  // Size classes
  if (size === 'sm') {
    classes += ' text-xs px-3 py-1.5';
  } else if (size === 'md') {
    classes += ' text-sm px-4 py-2';
  } else if (size === 'lg') {
    classes += ' text-base px-6 py-3';
  }
  
  // Disabled state
  if (disabled) {
    classes += ' opacity-50 cursor-not-allowed';
  }
  
  // Custom classes
  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;