'use client';

import React, { useState } from 'react';
import { Calendar, ConfigProvider } from 'antd';
import type { CalendarProps } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface DateRange {
  start: string;
  end: string;
}

interface CustomCalendarProps {
  onDateChange?: (start: string, end: string) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs().add(1, 'day'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingEndDate, setSelectingEndDate] = useState(false);

  const handleDateSelect: CalendarProps<dayjs.Dayjs>['onSelect'] = (date) => {
    if (!selectingEndDate) {
      setStartDate(date);
      setSelectingEndDate(true);
    } else {
      if (date.isAfter(startDate)) {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(startDate);
      }
      setSelectingEndDate(false);
      
      // Call the onDateChange callback if provided
      if (onDateChange) {
        onDateChange(startDate.format('MM/DD'), endDate.format('MM/DD'));
      }
      
      setShowCalendar(false);
    }
  };

  const formatDateRange = (): string => {
    return `${startDate.format('MMM DD')} - ${endDate.format('MMM DD')}`;
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors border border-[#dddddd]"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarOutlined className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{formatDateRange()}</span>
      </div>

      {showCalendar && (
        <div className="absolute top-full right-0 mt-2 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="mb-2 text-sm font-medium text-gray-700">
            {selectingEndDate ? 'Select end date' : 'Select start date'}
          </div>
          <ConfigProvider>
            <Calendar
              onSelect={handleDateSelect}
              value={startDate}
              style={{ border: 'none' }}
              fullscreen={false}
              mode="month"
            />
          </ConfigProvider>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;