'use client';

import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  autoComplete?: string;
  prefix?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any; // Allow any additional props
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  error,
  disabled = false,
  name,
  required = false,
  id,
  autoComplete,
  prefix,
  style,
  ...props // Spread any additional props
}: InputProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative pr-8">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          name={name}
          required={required}
          id={id}
          autoComplete={autoComplete}
          className={`w-full ${prefix ? 'pl-10' : 'px-4'} py-0.7rem border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          placeholder-gray-300`}
          style={{ 
            paddingTop: '0.5rem', 
            paddingBottom: '0.5rem',
            fontFamily: 'Afacad, sans-serif',
            fontSize: '16px',
            color: '#c5c5c5', // Lighter gray for reduced visibility
            ...style
          }}
          {...props} // Spread any additional props
        />
        <style jsx>{`
          input::placeholder {
            color: #c5c5c5;
            opacity: 1; /* Firefox */
          }
          
          input::-webkit-input-placeholder {
            color: #c5c5c5;
          }
          
          input::-moz-placeholder {
            color: #c5c5c5;
            opacity: 1; /* Firefox */
          }
          
          input:-ms-input-placeholder {
            color: #c5c5c5;
          }
          
          input::-ms-input-placeholder {
            color: #c5c5c5;
          }
        `}</style>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;