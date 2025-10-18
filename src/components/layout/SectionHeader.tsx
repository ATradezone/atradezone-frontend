'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
  showDivider?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  className = '',
  showDivider = false
}) => {
  return (
    <>
      <div className={`flex items-center mb-0 ${className}`} style={{ marginTop: '-1rem' }}>
        <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
        <h2 className="text-lg font-semibold text-gray-800 pt-0 pb-0">{title}</h2>
      </div>
      {showDivider && (
        <div className="h-px bg-[#EAECF0] mt-2 mb-6"></div>
      )}
    </>
  );
};

export default SectionHeader;