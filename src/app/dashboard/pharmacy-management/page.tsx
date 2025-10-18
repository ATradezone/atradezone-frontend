'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/reusable';
import { MedicineBoxOutlined, FileTextOutlined } from '@ant-design/icons';
import PageTitle from '@/components/ui/PageTitle';

const PharmacyManagementPage = () => {
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Pharmacy Management', current: true }
  ];

  const managementCards = [
    {
      title: 'Patients & Vouchers',
      description: 'Manage patient records and voucher information',
      icon: <MedicineBoxOutlined className="text-2xl" />,
      href: '/dashboard/pharmacy-management/patients-vouchers',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Sales Invoice & Reports',
      description: 'View sales invoices and generate reports',
      icon: <FileTextOutlined className="text-2xl" />,
      href: '/dashboard/pharmacy-management/sales-invoice-reports',
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title="Pharmacy Management" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pharmacy Management</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 block cursor-pointer"
            onClick={() => router.push(card.href)}
          >
            <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
            <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
              Manage
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyManagementPage;