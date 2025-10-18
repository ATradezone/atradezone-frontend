import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const IconButton = ({
  icon,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel
}: IconButtonProps) => {
  // Base classes
  let classes = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-md';
  
  // Variant classes
  if (variant === 'primary') {
    classes += ' bg-[rgb(133,237,104)] text-[rgb(235,253,229)] font-bold border border-[rgb(133,237,104)]';
  } else if (variant === 'secondary') {
    classes += ' bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300';
  } else if (variant === 'outline') {
    classes += ' border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700';
  } else if (variant === 'ghost') {
    classes += ' bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-transparent';
  }
  
  // Size classes
  if (size === 'sm') {
    classes += ' text-xs p-1.5';
  } else if (size === 'md') {
    classes += ' text-sm p-2';
  } else if (size === 'lg') {
    classes += ' text-base p-3';
  }
  
  // Disabled state
  if (disabled) {
    classes += ' opacity-50 cursor-not-allowed hover:shadow-sm';
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
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;