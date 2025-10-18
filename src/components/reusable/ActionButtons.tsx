import React from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined, CloseOutlined, ReloadOutlined, UnorderedListOutlined, UploadOutlined, DownloadOutlined, ArrowLeftOutlined, PrinterOutlined } from '@ant-design/icons';
import IconButton from '@/components/ui/IconButton';

interface ActionButtonProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReset?: () => void;
  onReload?: () => void;
  onList?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onBack?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  resetLabel?: string;
  reloadLabel?: string;
  listLabel?: string;
  importLabel?: string;
  exportLabel?: string;
  backLabel?: string;
  printLabel?: string;
  downloadLabel?: string;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonProps> = ({
  onView,
  onEdit,
  onDelete,
  onReset,
  onReload,
  onList,
  onImport,
  onExport,
  onBack,
  onPrint,
  onDownload,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
  resetLabel = "Reset",
  reloadLabel = "Reload",
  listLabel = "List",
  importLabel = "Import",
  exportLabel = "Export",
  backLabel = "Go Back",
  printLabel = "Print",
  downloadLabel = "Download",
  className = ""
}) => {
  // Event handlers that stop propagation and call the original handlers
  const handleViewClick = () => {
    // In a real browser environment, we could stop propagation here
    // But since we're passing the function directly, we'll just call the handler
    onView && onView();
  };

  const handleEditClick = () => {
    onEdit && onEdit();
  };

  const handleDeleteClick = () => {
    onDelete && onDelete();
  };

  const handleResetClick = () => {
    onReset && onReset();
  };

  const handleReloadClick = () => {
    onReload && onReload();
  };

  const handleListClick = () => {
    onList && onList();
  };

  const handleImportClick = () => {
    onImport && onImport();
  };

  const handleExportClick = () => {
    onExport && onExport();
  };

  const handleBackClick = () => {
    onBack && onBack();
  };

  const handlePrintClick = () => {
    onPrint && onPrint();
  };

  const handleDownloadClick = () => {
    onDownload && onDownload();
  };

  // Render icon buttons (this is now the default and only implementation)
 return (
  <div className={`flex items-center space-x-2 ${className}`}>
    {onView && (
      <IconButton
        icon={<EyeOutlined style={{ color: '#2663eb', fontSize: '16px' }} />}
        onClick={handleViewClick}
        ariaLabel={viewLabel}
        size="sm"
        className="!bg-white !border !border-[#2663eb]"
      />
    )}
    
    {onEdit && (
      <IconButton
        icon={<EditOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleEditClick}
        ariaLabel={editLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onDelete && (
      <IconButton
        icon={<DeleteOutlined style={{ color: '#FF346A', fontSize: '16px' }} />}
        variant="ghost"
        onClick={handleDeleteClick}
        ariaLabel={deleteLabel}
        size="sm"
        className="!border !border-[#FF346A] !bg-transparent"
      />
    )}
    
    {onReset && (
      <IconButton
        icon={<CloseOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleResetClick}
        ariaLabel={resetLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onReload && (
      <IconButton
        icon={<ReloadOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleReloadClick}
        ariaLabel={reloadLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onList && (
      <IconButton
        icon={<UnorderedListOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleListClick}
        ariaLabel={listLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onImport && (
      <IconButton
        icon={<UploadOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleImportClick}
        ariaLabel={importLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onExport && (
      <IconButton
        icon={<DownloadOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleExportClick}
        ariaLabel={exportLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onBack && (
      <IconButton
        icon={<ArrowLeftOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />}
        onClick={handleBackClick}
        ariaLabel={backLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onPrint && (
      <IconButton
        icon={<PrinterOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handlePrintClick}
        ariaLabel={printLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
    
    {onDownload && (
      <IconButton
        icon={<DownloadOutlined style={{ color: '#6E82A5', fontSize: '16px' }} />}
        onClick={handleDownloadClick}
        ariaLabel={downloadLabel}
        size="sm"
        className="!bg-white !border !border-[rgb(110,131,165)]"
      />
    )}
  </div>
);
};

export default ActionButtons;