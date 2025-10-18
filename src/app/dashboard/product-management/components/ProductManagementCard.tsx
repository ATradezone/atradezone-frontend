import React from 'react';
import { useRouter } from 'next/navigation';

interface ProductManagementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const ProductManagementCard: React.FC<ProductManagementCardProps> = ({ 
  title, 
  description, 
  icon, 
  href,
  color
}) => {
  const router = useRouter();
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 block cursor-pointer"
      onClick={() => router.push(href)}
    >
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
        Manage
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default ProductManagementCard;