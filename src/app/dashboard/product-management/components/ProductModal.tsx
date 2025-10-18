import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import StatCard from '@/components/ui/StatCard';
import { Input, Button } from '@/components/ui'; // Import our new Input and Button components
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { DatabaseOutlined, TagOutlined, FileTextOutlined } from '@ant-design/icons';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: {
    productName: string;
    category: string;
    taxType: string;
    salePrice: string;
    purchaseCost: string;
  }) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    taxType: '',
    salePrice: '',
    purchaseCost: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
      productName: '',
      category: '',
      taxType: '',
      salePrice: '',
      purchaseCost: ''
    });
  };

  // Footer buttons
  const footer = (
    <div className="flex justify-between space-x-3">
      <Button
        variant="secondary"
        onClick={() => router.push('/dashboard/product-management/product-setup')}
      >
        Complete Setup
      </Button>
      <Button
        variant="primary"
        type="submit"
      >
        Create Product
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Product"
      subtitle="Enter basic information to get started"
      onSubmit={handleSubmit}
      footer={footer}
      maxWidth="max-w-md" // Explicitly set the width
    >
      {/* Section 1: Product Information */}
      <div>
        <div className="space-y-4">
          <StatCard>
            <Input
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={(e) => setFormData({...formData, productName: e.target.value})}
              placeholder="Enter product name"
              required
            />
          </StatCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatCard>
              <AutoCompleteSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={(value) => handleSelectChange('category', value)}
                options={[
                  { value: '', label: 'Select category' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'clothing', label: 'Clothing' },
                  { value: 'home', label: 'Home & Garden' },
                  { value: 'books', label: 'Books' },
                  { value: 'health', label: 'Health & Beauty' }
                ]}
                required
              />
            </StatCard>

            <StatCard>
              <AutoCompleteSelect
                label="Tax Type"
                name="taxType"
                value={formData.taxType}
                onChange={(value) => handleSelectChange('taxType', value)}
                options={[
                  { value: '', label: 'Select tax type' },
                  { value: 'vat', label: 'Tax Type A - EX' },
                  { value: 'sales-tax', label: 'Tax Type B - 18%' },
                  { value: 'no-tax-c', label: 'Tax Type C' },
                  { value: 'no-tax-d', label: 'Tax Type D' }
                ]}
                required
              />
            </StatCard>
          </div>
        </div>
      </div>

      {/* Section 2: Pricing */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <StatCard>
            <Input
              label="Sale Price"
              name="salePrice"
              value={formData.salePrice}
              onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
              placeholder="Enter sale price"
              required
            />
          </StatCard>

          <StatCard>
            <Input
              label="Purchase Cost"
              name="purchaseCost"
              value={formData.purchaseCost}
              onChange={(e) => setFormData({...formData, purchaseCost: e.target.value})}
              placeholder="Enter purchase cost"
              required
            />
          </StatCard>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;