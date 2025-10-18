import React from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  linkColor?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, linkColor = 'rgb(17, 24, 39)' }) => {
  const router = useRouter();
  
  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="flex items-start -mt-5 -ml-10 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-start">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href && !item.current ? (
              <span 
                className="hover:text-green-800 cursor-pointer"
                onClick={() => handleClick(item.href!)}
                style={{ color: linkColor }}
              >
                {item.name}
              </span>
            ) : (
              <span className={item.current ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                {item.name}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2">›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    
  );
};

export default Breadcrumb;