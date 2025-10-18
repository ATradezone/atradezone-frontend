import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../../../components/ui/Modal';
import StatCard from '../../../../components/ui/StatCard';
import { Input, Button } from '@/components/ui'; // Import our new Input and Button components
import { TeamOutlined, MailOutlined, PhoneOutlined, FileTextOutlined, GlobalOutlined } from '@ant-design/icons';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (supplierData: {
    companyName: string;
    emailAddress: string;
    phoneNumber: string;
    tinNumber: string;
    website: string;
  }) => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    emailAddress: '',
    phoneNumber: '',
    tinNumber: '',
    website: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      companyName: '',
      emailAddress: '',
      phoneNumber: '',
      tinNumber: '',
      website: ''
    });
  };

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button
        variant="secondary"
        onClick={() => router.push('/dashboard/user-management/supplier-setup')}
      >
        Complete Setup
      </Button>
      <Button
        variant="primary"
        type="submit"
      >
        Create Supplier
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Supplier"
      subtitle="Enter basic supplier information to get started"
      onSubmit={handleSubmit}
      footer={footer}
      maxWidth="max-w-md" // Explicitly set the width
    >
      {/* Name and Email on one line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <StatCard 
          title="Company"
          icon={<TeamOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            name="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            placeholder="Enter company name"
            required
            className="mt-2"
          />
        </StatCard>

        <StatCard 
          title="Email Address"
          icon={<MailOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
            placeholder="Enter email address"
            required
            className="mt-2"
          />
        </StatCard>
      </div>

      {/* Phone and TIN on another line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <StatCard 
          title="Phone Number"
          icon={<PhoneOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            placeholder="Enter phone number"
            required
            className="mt-2"
          />
        </StatCard>

        <StatCard 
          title="TIN Number"
          icon={<FileTextOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            name="tinNumber"
            value={formData.tinNumber}
            onChange={(e) => setFormData({...formData, tinNumber: e.target.value})}
            placeholder="Enter TIN number (Optional)"
            className="mt-2"
          />
        </StatCard>
      </div>

      {/* Website input */}
      <div className="grid grid-cols-1 gap-3">
        <StatCard 
          title="Website"
          icon={<GlobalOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            type="url"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({...formData, website: e.target.value})}
            placeholder="https://example.com"
            className="mt-2"
          />
        </StatCard>
      </div>
    </Modal>
  );
};

export default SupplierModal;