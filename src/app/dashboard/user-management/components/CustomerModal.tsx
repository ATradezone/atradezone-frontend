import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../../../components/ui/Modal';
import StatCard from '../../../../components/ui/StatCard';
import { Input, Button } from '@/components/ui'; // Import our new Input and Button components
import { UserOutlined, MailOutlined, PhoneOutlined, FileTextOutlined } from '@ant-design/icons';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerData: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    tinNumber: string;
  }) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    tinNumber: ''
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
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      tinNumber: ''
    });
  };

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button
        variant="secondary"
        onClick={() => router.push('/dashboard/user-management/customer-setup')}
      >
        Complete Setup
      </Button>
      <Button
        variant="primary"
        type="submit"
      >
        Create Customer
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Customer"
      subtitle="Enter basic customer information to get started"
      onSubmit={handleSubmit}
      footer={footer}
      maxWidth="max-w-md" // Explicitly set the width
    >
      {/* Name and Email on one line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <StatCard 
          title="Full Name"
          icon={<UserOutlined />}
          className="pr-5"
        >
          <Input
            label=""
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Enter full name"
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
    </Modal>
  );
};

export default CustomerModal;