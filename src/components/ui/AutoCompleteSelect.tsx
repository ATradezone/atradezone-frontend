'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AutoCompleteOption {
  value: string;
  label: string;
}

interface AutoCompleteSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: AutoCompleteOption[];
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  id?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  actionButton?: {
    icon: React.ReactNode;
    onClick: () => void;
  };
  swapActionButtonPosition?: boolean; // New prop to control positioning
  showClearButton?: boolean; // New prop to show/hide clear button
}

const AutoCompleteSelect = ({
  label,
  value,
  onChange,
  options,
  className = '',
  style,
  error,
  disabled = false,
  name,
  required = false,
  id,
  placeholder = 'Select an option...',
  prefix,
  actionButton,
  swapActionButtonPosition = false, // Default to false to maintain existing behavior
  showClearButton = false // Default to false to maintain existing behavior
}: AutoCompleteSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<AutoCompleteOption[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);

  // Set input value when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const selectedOption = options.find(option => option.value === value);
      // If no matching option is found, use the value directly as the input value
      setInputValue(selectedOption ? selectedOption.label : value);
    } else {
      // If value is undefined or null, check if there's a default option (empty string value)
      const defaultOption = options.find(option => option.value === '');
      setInputValue(defaultOption ? defaultOption.label : '');
    }
  }, [value, options]);

  // Filter options based on input value
  useEffect(() => {
    if (inputValue === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
    // Reset highlighted index when options change
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionSelect = (option: AutoCompleteOption) => {
    setIsSelecting(true);
    setInputValue(option.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onChange) {
      onChange(option.value);
    }
    // Reset selecting flag after a short delay
    setTimeout(() => setIsSelecting(false), 10);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsFocused(true);
      setIsOpen(true);
      setHighlightedIndex(-1);
      // If input is empty, show all options
      if (inputValue === '') {
        setFilteredOptions(options);
      }
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Don't close immediately, let the click handler decide
    setTimeout(() => {
      // If we're in the middle of selecting an option, don't clear the input
      if (isSelecting) return;
      
      // If value doesn't match any option, keep the input value but trigger onChange
      if (inputValue && !options.some(option => option.label === inputValue)) {
        // Check if there's a selected value that matches
        if (value && options.some(option => option.value === value)) {
          // Keep the selected value
          const selectedOption = options.find(option => option.value === value);
          if (selectedOption) {
            setInputValue(selectedOption.label);
          }
        } else {
          // Keep the input value and trigger onChange with the input value
          // This allows for direct values that don't match options
          if (onChange) {
            onChange(inputValue);
          }
        }
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        setHighlightedIndex(e.key === 'ArrowDown' ? 0 : filteredOptions.length - 1);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => {
          const newIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          scrollToOption(newIndex);
          return newIndex;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          scrollToOption(newIndex);
          return newIndex;
        });
        break;
      case 'Enter':
        e.preventDefault();
        // Stop propagation to prevent triggering parent form submissions
        e.stopPropagation();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
    // Focus the input after clearing
    setTimeout(() => {
      const input = wrapperRef.current?.querySelector('input');
      if (input) {
        input.focus();
      }
    }, 0);
  };

  const scrollToOption = (index: number) => {
    if (optionRefs.current[index]) {
      optionRefs.current[index].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  };

  const setOptionRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      optionRefs.current[index] = el;
    }
  };

  return (
    <div className={className} ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative pr-8 text-gray-500">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          required={required}
          id={id}
          className={`w-full ${prefix ? 'pl-10' : 'px-4'} py-0.7rem border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
          style={{ 
            ...style, 
            paddingTop: '0.5rem', 
            paddingBottom: '0.5rem', 
            fontFamily: 'Afacad, sans-serif', 
            fontSize: '16px', 
            color: '#7d7d7d',
            border: '1px solid #d9d9d9',
            borderRadius: '8px'
          }}
        />
        {/* Clear button - only show when there's a value and showClearButton is true */}
        {showClearButton && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-10 flex items-center px-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            style={{ width: '2.5rem', marginRight: '1.6rem' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        {/* Position elements based on swapActionButtonPosition */}
        {swapActionButtonPosition ? (
          // Action button at the far right, dropdown arrow to its left
          <>
            {actionButton && (
              <button
                type="button"
                onClick={() => {
                  // If there's a value, call the actionButton onClick which should handle reset logic
                  // Otherwise, call the original onClick
                  actionButton.onClick();
                }}
                className={`absolute right-0 top-0 h-full px-2 bg-white border-l hover:bg-[rgb(233 238 246)] transition-colors flex items-center justify-center rounded-tr-lg rounded-br-lg ${
                  isFocused ? 'border-l-2 border-blue-500' : 'border-l border-gray-300'
                }`}
                style={{ width: '2.5rem', marginRight: '-2px' }}
              >
                {actionButton.icon}
              </button>
            )}
            <div className="absolute inset-y-0 right-10 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </>
        ) : (
          // Default positioning: dropdown arrow at far right, action button to its left
          <>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            {actionButton && (
              <button
                type="button"
                onClick={() => {
                  // If there's a value, call the actionButton onClick which should handle reset logic
                  // Otherwise, call the original onClick
                  actionButton.onClick();
                }}
                className={`absolute right-6 top-0 h-full px-2 bg-white border-l hover:bg-[rgb(233 238 246)] transition-colors flex items-center justify-center rounded-tr-lg rounded-br-lg ${
                  isFocused ? 'border-l-2 border-blue-500' : 'border-l border-gray-300'
                }`}
                style={{ width: '2.5rem', marginRight: '-1.6rem' }}
              >
                {actionButton.icon}
              </button>
            )}
          </>
        )}
        
        {isOpen && !disabled && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-auto"
            style={{ 
              maxHeight: filteredOptions.length > 3 ? '150px' : 'auto',
              overflowY: filteredOptions.length > 3 ? 'auto' : 'visible'
            }}>
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  ref={setOptionRef(index)}
                  className={`px-4 py-2 cursor-pointer ${
                    highlightedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  style={{ color: '#7d7d7d' }}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default AutoCompleteSelect;