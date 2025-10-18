import React from 'react';

interface ChartPlaceholderProps {
  title?: string;
  height?: string;
  className?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title = "Chart Visualization",
  height = "h-64",
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <div className={`${height} flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300`}>
        <div className="text-center">
          <div className="text-gray-400 mb-2">Chart will be displayed here</div>
          <div className="text-sm text-gray-500">Data visualization component</div>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;