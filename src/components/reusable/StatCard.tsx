import React from 'react';

interface StatCardProps {
  title: string;
  value?: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  color = "bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)]",
  trend,
  trendValue,
  className = "",
  children
}) => {
  return (
    <div className={`p-4 rounded-xl bg-white ${color} ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-lg bg-[#F6F9FF] border border-[#DBE9FE]">
            {icon}
          </div>
        )}
        <div>
          <div className="text-sm font-medium text-gray-600">{title}</div>
          {value !== undefined && (
            <div className="text-xl font-bold text-gray-800">{value}</div>
          )}
          {description && (
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          )}
        </div>
      </div>
      {children && (
        <div className="mt-3">
          {children}
        </div>
      )}
      {trend && trendValue && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;