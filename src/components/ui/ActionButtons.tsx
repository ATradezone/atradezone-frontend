import React, { MouseEvent } from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import IconButton from '@/components/ui/IconButton';

interface ActionButtonProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
  iconOnly?: boolean; // New prop to show only icons without text
}

const ActionButtons: React.FC<ActionButtonProps> = ({
  onView,
  onEdit,
  onDelete,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
  className = "",
  iconOnly = false // Default to false to maintain backward compatibility
}) => {
  // Event handlers that stop propagation and call the original handlers
  const handleViewClick = (e: MouseEvent) => {
    e.stopPropagation();
    onView && onView();
  };

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    onEdit && onEdit();
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete && onDelete();
  };

  // If iconOnly is true, render icon buttons
  if (iconOnly) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {onView && (
          <IconButton
            icon={<EyeOutlined />}
            onClick={() => handleViewClick({} as any)}
            ariaLabel={viewLabel}
            size="sm"
            variant="outline"
          />
        )}
        
        {onEdit && (
          <IconButton
            icon={<EditOutlined />}
            onClick={() => handleEditClick({} as any)}
            ariaLabel={editLabel}
            size="sm"
            variant="outline"
          />
        )}
        
        {onDelete && (
          <IconButton
            icon={<DeleteOutlined />}
            variant="outline"
            onClick={() => handleDeleteClick({} as any)}
            ariaLabel={deleteLabel}
            size="sm"
          />
        )}
      </div>
    );
  }

  // Default buttons with icons and text (original implementation)
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {onView && (
        <button 
          type="button"
          className="action-button flex items-center space-x-1 !bg-white !hover:bg-white text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-[5px] border border-[#e9eef6] transition-all duration-200 font-medium text-sm cursor-pointer focus:outline-none"
          onClick={handleViewClick}
        >
          <EyeOutlined />
          <span>{viewLabel}</span>
        </button>
      )}
      
      {onEdit && (
        <button 
          type="button"
          className="action-button flex items-center space-x-1 !bg-white !hover:bg-white text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-[5px] border border-[#e9eef6] transition-all duration-200 font-medium text-sm cursor-pointer focus:outline-none"
          onClick={handleEditClick}
        >
          <EditOutlined />
          <span>{editLabel}</span>
        </button>
      )}
      
      {onDelete && (
        <button 
          type="button"
          className="action-button flex items-center space-x-1 !bg-white !hover:bg-white text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-[5px] border border-[#e9eef6] transition-all duration-200 font-medium text-sm cursor-pointer focus:outline-none"
          onClick={handleDeleteClick}
        >
          <DeleteOutlined />
          <span>{deleteLabel}</span>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;