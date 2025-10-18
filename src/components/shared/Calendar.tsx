'use client';

import React, { useState } from 'react';
import { Calendar, ConfigProvider } from 'antd';
import type { CalendarProps } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange: CalendarProps<dayjs.Dayjs>['onChange'] = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const getSelectedDateRange = (): string => {
    return selectedDate.format('MMM DD YYYY');
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors border border-[#dddddd]"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <CalendarOutlined className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{getSelectedDateRange()}</span>
      </div>

      {showCalendar && (
        <div className="absolute top-full right-0 mt-2 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <ConfigProvider>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
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