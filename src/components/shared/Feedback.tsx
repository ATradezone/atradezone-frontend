'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import CloseButton from '@/components/ui/CloseButton';

interface FeedbackProps {
  message: string;
  description?: string;
  mode: 'live' | 'test';
  duration?: number;
  onClose: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ message, description, mode, duration = 8000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading delay
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Set timer for auto-dismissal
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration, onClose]);

  if (!visible) return null;

  // Define colors based on mode
  const bgColor = mode === 'live' ? '#f0fdf4' : '#fff7ed';
  const borderColor = mode === 'live' ? '#bbf7d0' : '#fed7aa';
  const textColor = mode === 'live' ? '#16a34a' : '#ea580c';
  const iconColor = mode === 'live' ? '#16a34a' : '#ea580c';
  
  // Default description based on mode if not provided
  const defaultDescription = mode === 'live' 
    ? 'In live mode, invoices and stock data are automatically synced with the RRA EBM back office.' 
    : 'In training mode, invoices and stock data are not synced with the RRA EBM back office';

  return (
    <div 
      className="fixed top-16 right-2 z-50 flex px-2 py-2 rounded-lg shadow-lg transition-all duration-300 animate-fade-in"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        marginRight: '1.5rem',
        marginTop: '1.5rem'
      }}
    >
      <div className="flex">
        <div className="flex items-start pt-0.5">
          <CheckCircleOutlined className="text-lg" style={{ color: iconColor }} />
        </div>
        <div className="ml-2 flex flex-col flex-grow">
          {loading ? (
            <>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="mt-0.5 h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
            </>
          ) : (
            <>
              <span className="font-medium">{message}</span>
              <div className="mt-0.5">
                <span className="text-sm opacity-80" style={{ whiteSpace: 'pre-line' }}>{description || defaultDescription}</span>
              </div>
            </>
          )}
        </div>
        <div className="ml-2 flex items-start pt-0.5">
          <CloseButton 
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;