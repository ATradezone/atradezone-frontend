import React from 'react';
import CloseButton from './CloseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: string; // Add maxWidth prop to allow custom width
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  onSubmit,
  footer,
  className = '',
  maxWidth = 'max-w-md' // Default to max-w-md but allow override
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className="fixed inset-0 bg-[#01363C] bg-opacity-15 flex items-center justify-center z-50 p-2">
      <div className={`bg-white rounded-[1.563rem] shadow-xl w-full ${maxWidth} max-h-[80vh] flex flex-col ${className}`}>
        {/* Sticky header */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 rounded-t-[1.563rem] shadow-[0_4px_5px_0px_rgb(219_225_226)]">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div 
                onClick={() => window.open('https://www.atradezone.ca/offices/', '_blank', 'noopener,noreferrer')}
                className="cursor-pointer"
              >
                <img 
                  src="/images/web-favicon.png" 
                  alt="ATradezone™ Cloud favicon logo" 
                  className="h-10 w-10 mr-2"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-[-0.1rem] mt-[-0.5rem]">{title}</h2>
                {subtitle && <p className="text-sm text-gray-600 mb-[-0.5rem] mt-[-0.1rem]">{subtitle}</p>}
              </div>
            </div>
            <CloseButton onClick={onClose} size="sm" />
          </div>
        </div>
        
        {/* Scrollable content */}
        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <div className="space-y-4 p-4 flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Sticky footer */}
          {footer && (
            <div className="sticky bottom-0 bg-white z-10 p-4 rounded-b-[1.563rem]" 
                 style={{ 
                   borderTop: '1px solid #E2E8F0',
                   borderBottomLeftRadius: '1.563rem',
                   borderBottomRightRadius: '1.563rem',
                   paddingTop: '13px',
                   backgroundColor: '#E2E8F0',
                 }}>
              {footer}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;