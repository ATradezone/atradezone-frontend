'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import ActionButtons from '@/components/ui/ActionButtons';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

export default function SubscriptionPlansManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Mock data for subscription plans
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: 'Starter Plan',
      price: 15000,
      currency: 'Frw',
      interval: 'month',
      features: [
        'Up to 5 users',
        'Basic inventory management',
        'Sales tracking',
        'Email support'
      ],
      popular: false,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Professional Plan',
      price: 35000,
      currency: 'Frw',
      interval: 'month',
      features: [
        'Up to 20 users',
        'Advanced inventory management',
        'Sales & purchase tracking',
        'Financial reports',
        'Priority support'
      ],
      popular: true,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Enterprise Plan',
      price: 65000,
      currency: 'Frw',
      interval: 'month',
      features: [
        'Unlimited users',
        'Complete inventory management',
        'Advanced analytics',
        'Multi-location support',
        'API access',
        '24/7 dedicated support'
      ],
      popular: false,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Basic Plan',
      price: 8000,
      currency: 'Frw',
      interval: 'month',
      features: [
        'Up to 3 users',
        'Simple inventory tracking',
        'Basic sales reports'
      ],
      popular: false,
      status: 'Inactive'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddPlan = (newPlan: any) => {
    setSubscriptionPlans([...subscriptionPlans, { ...newPlan, id: subscriptionPlans.length + 1 }]);
    setShowAddModal(false);
  };

  const handleUpdatePlan = (updatedPlan: any) => {
    setSubscriptionPlans(subscriptionPlans.map(plan => 
      plan.id === updatedPlan.id ? updatedPlan : plan
    ));
    setShowEditModal(false);
    setSelectedPlan(null);
  };

  const handleDeletePlan = (id: number) => {
    if (confirm('Are you sure you want to delete this subscription plan?')) {
      setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== id));
    }
  };

  const openEditModal = (plan: any) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  const filteredPlans = subscriptionPlans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 mx-0">
      <PageTitle title="Subscription Plans Management" />

      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
        </div>
        <Button 
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <PlusOutlined />
          Add New Plan
        </Button>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            {plan.popular && (
              <div className="bg-emerald-500 text-white text-center py-1 text-sm font-medium">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.currency} {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                  {plan.status}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-500 mr-2">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-2">
                <ActionButtons
                  onEdit={() => openEditModal(plan)}
                  onDelete={() => handleDeletePlan(plan.id)}
                  editLabel="Edit"
                  deleteLabel="Delete"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <AddPlanModal 
          onClose={() => setShowAddModal(false)} 
          onSave={handleAddPlan} 
        />
      )}

      {/* Edit Plan Modal */}
      {showEditModal && selectedPlan && (
        <EditPlanModal 
          plan={selectedPlan}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPlan(null);
          }} 
          onSave={handleUpdatePlan} 
        />
      )}
    </div>
  );
}

// Add Plan Modal Component
const AddPlanModal = ({ onClose, onSave }: { onClose: () => void; onSave: (plan: any) => void }) => {
  const [plan, setPlan] = useState({
    name: '',
    price: 0,
    currency: 'Frw',
    interval: 'month',
    features: [''] as string[],
    popular: false,
    status: 'Active'
  });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...plan.features];
    newFeatures[index] = value;
    setPlan({ ...plan, features: newFeatures });
  };

  const addFeature = () => {
    setPlan({ ...plan, features: [...plan.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = plan.features.filter((_: string, i: number) => i !== index);
    setPlan({ ...plan, features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty features
    const filteredFeatures = plan.features.filter((feature: string) => feature.trim() !== '');
    onSave({ ...plan, features: filteredFeatures });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Subscription Plan</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Plan Name"
                placeholder="Enter plan name"
                value={plan.name}
                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="flex">
                  <AutoCompleteSelect
                    value={plan.currency}
                    onChange={(value) => setPlan({ ...plan, currency: value })}
                    options={[
                      { value: 'Frw', label: 'Frw' },
                      { value: 'USD', label: 'USD' },
                      { value: 'EUR', label: 'EUR' },
                    ]}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={plan.price.toString() || ''}
                    onChange={(e) => setPlan({ ...plan, price: Number(e.target.value) })}
                    required
                    className="flex-1"
                  />
                </div>
              </div>
              
              <AutoCompleteSelect
                label="Billing Interval"
                value={plan.interval}
                onChange={(value) => setPlan({ ...plan, interval: value })}
                options={[
                  { value: 'month', label: 'Monthly' },
                  { value: 'year', label: 'Yearly' },
                ]}
              />
              
              <AutoCompleteSelect
                label="Status"
                value={plan.status}
                onChange={(value) => setPlan({ ...plan, status: value })}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                ]}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <button 
                  type="button"
                  className="text-emerald-600 hover:text-emerald-800 text-sm"
                  onClick={addFeature}
                >
                  + Add Feature
                </button>
              </div>
              
              {plan.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Enter feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {plan.features.length > 1 && (
                    <button
                      type="button"
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      onClick={() => removeFeature(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="popular"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                checked={plan.popular}
                onChange={(e) => setPlan({ ...plan, popular: e.target.checked })}
              />
              <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                Mark as Most Popular Plan
              </label>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Save Plan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Plan Modal Component
const EditPlanModal = ({ plan, onClose, onSave }: { plan: any; onClose: () => void; onSave: (plan: any) => void }) => {
  const [editedPlan, setEditedPlan] = useState({ ...plan });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...editedPlan.features];
    newFeatures[index] = value;
    setEditedPlan({ ...editedPlan, features: newFeatures });
  };

  const addFeature = () => {
    setEditedPlan({ ...editedPlan, features: [...editedPlan.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = editedPlan.features.filter((_: string, i: number) => i !== index);
    setEditedPlan({ ...editedPlan, features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty features
    const filteredFeatures = editedPlan.features.filter((feature: string) => feature.trim() !== '');
    onSave({ ...editedPlan, features: filteredFeatures });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Subscription Plan</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="Plan Name"
                placeholder="Enter plan name"
                value={editedPlan.name}
                onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <div className="flex">
                  <AutoCompleteSelect
                    value={editedPlan.currency}
                    onChange={(value) => setEditedPlan({ ...editedPlan, currency: value })}
                    options={[
                      { value: 'Frw', label: 'Frw' },
                      { value: 'USD', label: 'USD' },
                      { value: 'EUR', label: 'EUR' },
                    ]}
                    className="w-24"
                  />
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={editedPlan.price.toString() || ''}
                    onChange={(e) => setEditedPlan({ ...editedPlan, price: Number(e.target.value) })}
                    required
                    className="flex-1"
                  />
                </div>
              </div>
              
              <AutoCompleteSelect
                label="Billing Interval"
                value={editedPlan.interval}
                onChange={(value) => setEditedPlan({ ...editedPlan, interval: value })}
                options={[
                  { value: 'month', label: 'Monthly' },
                  { value: 'year', label: 'Yearly' },
                ]}
              />
              
              <AutoCompleteSelect
                label="Status"
                value={editedPlan.status}
                onChange={(value) => setEditedPlan({ ...editedPlan, status: value })}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                ]}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <button 
                  type="button"
                  className="text-emerald-600 hover:text-emerald-800 text-sm"
                  onClick={addFeature}
                >
                  + Add Feature
                </button>
              </div>
              
              {editedPlan.features.map((feature: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Enter feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {editedPlan.features.length > 1 && (
                    <button
                      type="button"
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      onClick={() => removeFeature(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="popular"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                checked={editedPlan.popular}
                onChange={(e) => setEditedPlan({ ...editedPlan, popular: e.target.checked })}
              />
              <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                Mark as Most Popular Plan
              </label>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Update Plan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};