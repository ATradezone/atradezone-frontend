'use client';

import { Info } from "lucide-react";
import { useState, useEffect } from "react";
import CustomCalendar from './Calendar';

export default function RevenueReport({ loading = false }: { loading?: boolean }) {
  const [dateRange, setDateRange] = useState({ start: "11/05", end: "11/06" });
  
  // Mock data for the report
  const totalRevenue = 7000000;
  const patientPayment = 4300000;
  const insurancePayment = 2700000;
  const patientCoveragePercentage = 61;
  const insuranceCoveragePercentage = 39;

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle date selection
  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
    // In a real app, you would fetch new data based on the selected date range
  };

  // Generate mock data for different date ranges
  const generateMockData = (startDate: string, endDate: string) => {
    // This would be replaced with actual API calls in a real application
    return {
      totalRevenue: 7000000 + Math.floor(Math.random() * 1000000),
      patientPayment: 4300000 + Math.floor(Math.random() * 500000),
      insurancePayment: 2700000 + Math.floor(Math.random() * 500000),
      patientCoveragePercentage: 61 + Math.floor(Math.random() * 10 - 5),
      insuranceCoveragePercentage: 39 - Math.floor(Math.random() * 10 - 5)
    };
  };

  // Simulate data fetching when date range changes
  useEffect(() => {
    // In a real app, this would trigger an API call to get data for the selected date range
    console.log(`Fetching data for ${dateRange.start} to ${dateRange.end}`);
  }, [dateRange]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Revenue Card Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 w-1/2"></div>
            <div className="flex items-baseline gap-1">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
            </div>
          </div>

          {/* Patient Payment Card Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-10 h-10"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
            <div className="flex items-center gap-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
              </div>
            </div>
          </div>

          {/* Insurance Payment Card Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-10 h-10"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-2"></div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold" style={{ color: 'rgb(107 114 128 / var(--tw-text-opacity, 1))', marginTop: '0.0rem' }}>Revenue Report</h2>
        <CustomCalendar onDateChange={handleDateChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Revenue</div>
          <div className="flex items-baseline gap-1">
            <div className="text-3xl font-bold text-gray-800">{formatNumber(totalRevenue)}</div>
            <div className="text-xl font-bold text-gray-800">Frw</div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">All payment methods combined</div>
          </div>
        </div>

        {/* Patient Payment Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-50 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2m0 0l-2-2m2 2l2-2m-2 2h4.764m-4.764-8H12v8h-4.764z" />
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-600">Patient Payment</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">{formatNumber(patientPayment)} Frw</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="text-xs text-gray-500">Cash Normal + Patient Co-Pay</div>
            <button className="text-gray-400 hover:text-gray-600">
              <Info className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${patientCoveragePercentage}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium text-gray-600">{patientCoveragePercentage}%</div>
            </div>
          </div>
        </div>

        {/* Insurance Payment Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-purple-50 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2m0 0l-2-2m2 2l2-2m-2 2h4.764m-4.764-8H12v8h-4.764z" />
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-600">Insurance Payment</div>
          </div>
          <div className="text-2xl font-bold text-purple-600">{formatNumber(insurancePayment)} Frw</div>
          <div className="mt-3">
            <div className="text-xs text-gray-500">61% covered by patients</div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${insuranceCoveragePercentage}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium text-gray-600">{insuranceCoveragePercentage}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}