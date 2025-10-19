'use client';

import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';

export default function ModulesManagement() {
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'Pharmacy Management',
      description: 'Complete pharmacy management system with inventory, prescriptions, and billing',
      status: 'Active',
      companies: 85,
      users: 340,
    },
    {
      id: 2,
      name: 'Manufacturing',
      description: 'Manufacturing module for production planning, quality control, and inventory management',
      status: 'Active',
      companies: 62,
      users: 186,
    },
    {
      id: 3,
      name: 'Point of Sales',
      description: 'POS system for retail sales, inventory tracking, and customer management',
      status: 'Active',
      companies: 112,
      users: 448,
    },
    {
      id: 4,
      name: 'Analytics & Reports',
      description: 'Advanced analytics and reporting dashboard for business intelligence',
      status: 'Active',
      companies: 78,
      users: 312,
    },
    {
      id: 5,
      name: 'Distribution Network',
      description: 'Supply chain and distribution network management',
      status: 'Inactive',
      companies: 0,
      users: 0,
    },
    {
      id: 6,
      name: 'Business Operations',
      description: 'General business operations and management tools',
      status: 'Active',
      companies: 95,
      users: 380,
    },
  ]);

  const toggleModuleStatus = (id: number) => {
    setModules(modules.map(module => 
      module.id === id 
        ? { ...module, status: module.status === 'Active' ? 'Inactive' : 'Active' } 
        : module
    ));
  };

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

  return (
    <div className="p-6 mx-0">
      <PageTitle title="Modules Management" />

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">{module.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(module.status)}`}>
                  {module.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{module.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>
                  <span className="font-medium">{module.companies}</span> companies
                </div>
                <div>
                  <span className="font-medium">{module.users}</span> users
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleModuleStatus(module.id)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    module.status === 'Active' 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {module.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Module Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
          Add New Module
        </button>
      </div>
    </div>
  );
}