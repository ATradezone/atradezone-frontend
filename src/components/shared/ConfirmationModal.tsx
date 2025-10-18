import React from 'react';
import CloseButton from '@/components/ui/CloseButton';
import { Button } from '@/components/ui';
import StatCard from '@/components/ui/StatCard';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  itemsCount?: number;
  grandTotal?: number;
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Purchase',
  message = 'This action is irreversible.<br />Are you sure you want to create this purchase?',
  confirmText = 'Confirm Purchase',
  cancelText = 'Cancel',
  itemsCount,
  grandTotal,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#01363C] bg-opacity-15 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-[1.563rem] shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
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
                <p className="text-sm text-gray-600 mb-[-0.5rem] mt-[-0.1rem]">Please confirm this action</p>
              </div>
            </div>
            <CloseButton onClick={onClose} size="sm" />
          </div>
        </div>
        
        {/* Scrollable content */}
        <div className="space-y-4 p-4 flex-1 overflow-y-auto">
          {children ? (
            children
          ) : (
            <div className="text-center py-4 ext-[#ff346b] mb-0 bg-[#ffe6ee] border border-[#ffccd6] p-4 rounded-xl">
              <StatCard className="text-[#ff346b] mb-4 p-4 rounded">
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </StatCard>
              {(itemsCount !== undefined || grandTotal !== undefined) && (
                <div className="grid grid-cols-2 gap-4">
                  {itemsCount !== undefined && (
                    <StatCard>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Items:</span> {itemsCount}
                      </p>
                    </StatCard>
                  )}
                  {grandTotal !== undefined && (
                    <StatCard>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Grand Total:</span> {grandTotal.toFixed(2)} Frw
                      </p>
                    </StatCard>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white z-10 p-4 rounded-b-[1.563rem]" 
             style={{ 
               borderTop: '1px solid #E2E8F0',
               borderBottomLeftRadius: '1.563rem',
               borderBottomRightRadius: '1.563rem',
               paddingTop: '13px',
               backgroundColor: '#E2E8F0',
             }}>
          <div className="flex justify-between space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              variant="primary"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;