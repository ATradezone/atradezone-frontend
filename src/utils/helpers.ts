// Format number with commas
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format currency
export const formatCurrency = (amount: number, currency = 'Frw'): string => {
  return `${formatNumber(amount)} ${currency}`;
};

// Get formatted date range
export const formatDateRange = (start: string, end: string, year: string): string => {
  return `${start} — ${end} ${year}`;
};

// Generate random mock data
export const generateMockData = (startDate: string, endDate: string) => {
  // This would be replaced with actual API calls in a real application
  return {
    totalRevenue: 7000000 + Math.floor(Math.random() * 1000000),
    patientPayment: 4300000 + Math.floor(Math.random() * 500000),
    insurancePayment: 2700000 + Math.floor(Math.random() * 500000),
    patientCoveragePercentage: 61 + Math.floor(Math.random() * 10 - 5),
    insuranceCoveragePercentage: 39 - Math.floor(Math.random() * 10 - 5)
  };
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};