import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CloseButton: React.FC<CloseButtonProps> = ({ 
  onClick, 
  className = '',
  size = 'md'
}) => {
  // Base classes for a softer appearance with border and no background
  let classes = 'flex items-center justify-center rounded-full border bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 transition-all duration-200';
  
  // Size classes
  if (size === 'sm') {
    classes += ' w-5 h-5 text-xs';
  } else if (size === 'md') {
    classes += ' w-6 h-6 text-sm';
  } else if (size === 'lg') {
    classes += ' w-8 h-8 text-base';
  }
  
  // Custom classes
  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button 
      className={classes}
      onClick={onClick}
      style={{ borderColor: '#c8d3da' }}
    >
      <CloseOutlined className="text-gray-500 hover:text-gray-700" style={{ fontSize: '12px' }} />
    </button>
  );
};

export default CloseButton;