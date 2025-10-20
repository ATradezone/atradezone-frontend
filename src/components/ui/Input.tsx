'use client';

import React, { useState, useEffect, useRef } from 'react';

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
  // Validation props
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  validate?: (value: string) => string | null; // Custom validation function that returns error message or null
  [key: string]: any; // Allow any additional props
}

const Input = ({
  label,
  placeholder,
  value = '',
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
  // Validation props
  pattern,
  minLength,
  maxLength,
  validate,
  ...props // Spread any additional props
}: InputProps) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate the input value
  const validateInput = (inputValue: string): string | null => {
    // Check required field
    if (required && !inputValue) {
      return 'This field is required';
    }
    
    // Check minLength
    if (minLength !== undefined && inputValue.length < minLength) {
      return `Minimum length is ${minLength} characters`;
    }
    
    // Check maxLength
    if (maxLength !== undefined && inputValue.length > maxLength) {
      return `Maximum length is ${maxLength} characters`;
    }
    
    // Check pattern
    if (pattern && inputValue) {
      try {
        const regex = new RegExp(pattern);
        if (!regex.test(inputValue)) {
          return 'Invalid format';
        }
      } catch (e) {
        console.warn('Invalid regex pattern provided:', pattern);
      }
    }
    
    // Check custom validation
    if (validate) {
      return validate(inputValue);
    }
    
    return null;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Call the original onChange if provided
    if (onChange) {
      onChange(e);
    }
    
    // Validate the input
    const error = validateInput(inputValue);
    setValidationError(error);
  };

  // Handle blur event to mark input as touched
  const handleBlur = () => {
    setTouched(true);
  };

  // Validate when value changes from outside or validation rules change
  useEffect(() => {
    if (touched) {
      const error = validateInput(value);
      setValidationError(error);
    }
  }, [value, touched, required, minLength, maxLength, pattern, validate]);

  // Determine the error message to display
  const displayError = error || (touched ? validationError : null);

  return (
    <div className={className} style={style}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative mr-11">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          name={name}
          required={false} // We handle required validation ourselves
          id={id}
          autoComplete={autoComplete}
          className={`w-full ${prefix ? 'pl-10' : 'px-4'} py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            displayError ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          placeholder-gray-300`}
          style={{ 
            paddingTop: '0.5rem', 
            paddingBottom: '0.5rem',
            fontFamily: 'Afacad, sans-serif',
            fontSize: '16px',
            color: '#c5c5c5', // Lighter gray for reduced visibility
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
      {displayError && (
        <p className="text-sm text-red-600" role="alert" style={{marginBottom: '-2rem' }}>
          {displayError}
        </p>
      )}
    </div>
  );
};

export default Input;