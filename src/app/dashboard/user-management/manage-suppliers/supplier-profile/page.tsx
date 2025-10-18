'use client';

import { useState, useEffect } from "react";
import { 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ExclamationCircleOutlined, 
  CaretUpOutlined, 
  CaretDownOutlined, 
  UnorderedListOutlined,
  FileTextOutlined,
  MessageOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import Breadcrumb from '@/components/reusable/Breadcrumb';
import ActionButtons from '@/components/reusable/ActionButtons';
import { useRouter, useSearchParams } from 'next/navigation';
import PageTitle from '@/components/ui/PageTitle';

interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Active" | "Disabled";
  connectionStatus: "Connected" | "Disconnected";
  address: string;
  website: string;
  tinNumber: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
}

interface Transaction {
  id: number;
  date: string;
  orderNumber: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
}

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
}

interface Note {
  id: number;
  author: string;
  date: string;
  content: string;
}

// Mock supplier data - in a real app this would come from an API
const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "ABC Distributors",
    phone: "0782424845",
    email: "contact@abcdistributors.com",
    status: "Active",
    connectionStatus: "Connected",
    address: "123 Main Street, Kigali, Rwanda",
    website: "www.abcdistributors.com",
    tinNumber: "123456789",
    contactPerson: "John Doe",
    contactPhone: "0782424845",
    contactEmail: "john.doe@abcdistributors.com"
  },
  {
    id: 2,
    name: "XYZ Suppliers",
    phone: "0782424845",
    email: "info@xyzsuppliers.com",
    status: "Disabled",
    connectionStatus: "Disconnected",
    address: "456 Business Ave, Kigali, Rwanda",
    website: "www.xyzsuppliers.com",
    tinNumber: "987654321",
    contactPerson: "Jane Smith",
    contactPhone: "0782424846",
    contactEmail: "jane.smith@xyzsuppliers.com"
  },
  {
    id: 3,
    name: "Global Pharma",
    phone: "N/A",
    email: "support@globalpharma.com",
    status: "Active",
    connectionStatus: "Connected",
    address: "789 Medical Plaza, Kigali, Rwanda",
    website: "www.globalpharma.com",
    tinNumber: "456789123",
    contactPerson: "Dr. Michael Johnson",
    contactPhone: "0782424847",
    contactEmail: "michael.j@globalpharma.com"
  },
  {
    id: 4,
    name: "MediCare Inc.",
    phone: "0782424845",
    email: "hello@medicareinc.com",
    status: "Active",
    connectionStatus: "Connected",
    address: "101 Health Blvd, Kigali, Rwanda",
    website: "www.medicareinc.com",
    tinNumber: "789123456",
    contactPerson: "Sarah Wilson",
    contactPhone: "0782424848",
    contactEmail: "sarah.w@medicareinc.com"
  },
  {
    id: 5,
    name: "HealthFirst",
    phone: "N/A",
    email: "care@healthfirst.com",
    status: "Active",
    connectionStatus: "Disconnected",
    address: "202 Wellness St, Kigali, Rwanda",
    website: "www.healthfirst.com",
    tinNumber: "321654987",
    contactPerson: "Robert Brown",
    contactPhone: "0782424849",
    contactEmail: "robert.b@healthfirst.com"
  },
  {
    id: 6,
    name: "PharmaDirect",
    phone: "N/A",
    email: "sales@pharmadirect.com",
    status: "Active",
    connectionStatus: "Connected",
    address: "303 Medicine Ave, Kigali, Rwanda",
    website: "www.pharmadirect.com",
    tinNumber: "654987321",
    contactPerson: "Lisa Garcia",
    contactPhone: "0782424850",
    contactEmail: "lisa.g@pharmadirect.com"
  },
  {
    id: 7,
    name: "QuickMed",
    phone: "0782424845",
    email: "help@quickmed.com",
    status: "Disabled",
    connectionStatus: "Disconnected",
    address: "404 Emergency Rd, Kigali, Rwanda",
    website: "www.quickmed.com",
    tinNumber: "987321654",
    contactPerson: "David Miller",
    contactPhone: "0782424851",
    contactEmail: "david.m@quickmed.com"
  },
  {
    id: 8,
    name: "CarePlus",
    phone: "N/A",
    email: "contact@careplus.com",
    status: "Active",
    connectionStatus: "Connected",
    address: "505 Care Lane, Kigali, Rwanda",
    website: "www.careplus.com",
    tinNumber: "159753468",
    contactPerson: "Jennifer Lee",
    contactPhone: "0782424852",
    contactEmail: "jennifer.l@careplus.com"
  }
];

// Mock transaction data
const mockTransactions: Record<number, Transaction[]> = {
  1: [
    { id: 1, date: "2023-06-15", orderNumber: "#PO-001", amount: 25500, status: "Completed" },
    { id: 2, date: "2023-06-10", orderNumber: "#PO-002", amount: 18200, status: "Completed" },
    { id: 3, date: "2023-06-05", orderNumber: "#PO-003", amount: 32750, status: "Pending" },
    { id: 4, date: "2023-05-28", orderNumber: "#PO-004", amount: 15300, status: "Completed" },
    { id: 5, date: "2023-05-20", orderNumber: "#PO-005", amount: 22400, status: "Cancelled" }
  ],
  2: [
    { id: 6, date: "2023-06-12", orderNumber: "#PO-006", amount: 31200, status: "Completed" },
    { id: 7, date: "2023-06-08", orderNumber: "#PO-007", amount: 19800, status: "Pending" },
    { id: 8, date: "2023-05-30", orderNumber: "#PO-008", amount: 27500, status: "Completed" }
  ],
  3: [
    { id: 9, date: "2023-06-18", orderNumber: "#PO-009", amount: 42100, status: "Completed" },
    { id: 10, date: "2023-06-14", orderNumber: "#PO-010", amount: 33600, status: "Completed" },
    { id: 11, date: "2023-06-09", orderNumber: "#PO-011", amount: 28900, status: "Pending" }
  ],
  4: [
    { id: 12, date: "2023-06-20", orderNumber: "#PO-012", amount: 37500, status: "Completed" },
    { id: 13, date: "2023-06-15", orderNumber: "#PO-013", amount: 29800, status: "Completed" },
    { id: 14, date: "2023-06-10", orderNumber: "#PO-014", amount: 41200, status: "Pending" }
  ],
  5: [
    { id: 15, date: "2023-06-18", orderNumber: "#PO-015", amount: 26700, status: "Completed" },
    { id: 16, date: "2023-06-12", orderNumber: "#PO-016", amount: 33400, status: "Cancelled" },
    { id: 17, date: "2023-06-05", orderNumber: "#PO-017", amount: 28900, status: "Completed" }
  ],
  6: [
    { id: 18, date: "2023-06-22", orderNumber: "#PO-018", amount: 45600, status: "Completed" },
    { id: 19, date: "2023-06-17", orderNumber: "#PO-019", amount: 32100, status: "Completed" },
    { id: 20, date: "2023-06-11", orderNumber: "#PO-020", amount: 38700, status: "Pending" }
  ],
  7: [
    { id: 21, date: "2023-06-19", orderNumber: "#PO-021", amount: 29800, status: "Cancelled" },
    { id: 22, date: "2023-06-14", orderNumber: "#PO-022", amount: 35600, status: "Completed" },
    { id: 23, date: "2023-06-08", orderNumber: "#PO-023", amount: 27400, status: "Pending" }
  ],
  8: [
    { id: 24, date: "2023-06-25", orderNumber: "#PO-024", amount: 51200, status: "Completed" },
    { id: 25, date: "2023-06-20", orderNumber: "#PO-025", amount: 38900, status: "Completed" },
    { id: 26, date: "2023-06-15", orderNumber: "#PO-026", amount: 42300, status: "Pending" }
  ]
};

// Mock document data
const mockDocuments: Record<number, Document[]> = {
  1: [
    { id: 1, name: "Business License", type: "PDF", date: "2023-01-15" },
    { id: 2, name: "Tax Certificate", type: "PDF", date: "2023-01-20" },
    { id: 3, name: "Contract Agreement", type: "DOCX", date: "2023-02-01" }
  ],
  2: [
    { id: 4, name: "Business Registration", type: "PDF", date: "2023-03-10" },
    { id: 5, name: "Insurance Certificate", type: "PDF", date: "2023-03-15" }
  ],
  3: [
    { id: 6, name: "Pharmacy License", type: "PDF", date: "2023-02-28" },
    { id: 7, name: "Quality Certificate", type: "PDF", date: "2023-03-05" },
    { id: 8, name: "Supply Agreement", type: "DOCX", date: "2023-03-20" }
  ],
  4: [
    { id: 9, name: "Health License", type: "PDF", date: "2023-04-05" },
    { id: 10, name: "Business Permit", type: "PDF", date: "2023-04-10" }
  ],
  5: [
    { id: 11, name: "Service Agreement", type: "DOCX", date: "2023-03-25" },
    { id: 12, name: "Insurance Policy", type: "PDF", date: "2023-04-01" }
  ],
  6: [
    { id: 13, name: "Pharma License", type: "PDF", date: "2023-04-15" },
    { id: 14, name: "Quality Assurance", type: "PDF", date: "2023-04-20" }
  ],
  7: [
    { id: 15, name: "Emergency Services", type: "PDF", date: "2023-03-30" },
    { id: 16, name: "Contract", type: "DOCX", date: "2023-04-05" }
  ],
  8: [
    { id: 17, name: "Care Services", type: "PDF", date: "2023-04-18" },
    { id: 18, name: "Partnership Agreement", type: "DOCX", date: "2023-04-25" }
  ]
};

// Mock notes data
const mockNotes: Record<number, Note[]> = {
  1: [
    { id: 1, author: "Admin User", date: "2023-06-10", content: "Supplier has been very reliable with deliveries." },
    { id: 2, author: "Procurement Manager", date: "2023-05-22", content: "Had a delay in last order but resolved quickly." }
  ],
  2: [
    { id: 3, author: "Procurement Manager", date: "2023-06-05", content: "New supplier agreement signed." },
    { id: 4, author: "Admin User", date: "2023-05-15", content: "Background check completed, all clear." }
  ],
  3: [
    { id: 5, author: "Quality Assurance", date: "2023-06-18", content: "Products meet all quality standards." },
    { id: 6, author: "Procurement Manager", date: "2023-06-01", content: "Excellent response time for urgent orders." }
  ],
  4: [
    { id: 7, author: "Procurement Manager", date: "2023-06-20", content: "Consistent quality in all deliveries." },
    { id: 8, author: "Admin User", date: "2023-06-05", content: "Renewed contract for another year." }
  ],
  5: [
    { id: 9, author: "Quality Assurance", date: "2023-06-15", content: "Minor quality issue reported, under investigation." },
    { id: 10, author: "Procurement Manager", date: "2023-06-02", content: "Supplier has improved their packaging methods." }
  ],
  6: [
    { id: 11, author: "Admin User", date: "2023-06-22", content: "Outstanding performance this quarter." },
    { id: 12, author: "Procurement Manager", date: "2023-06-10", content: "Fast delivery times consistently met." }
  ],
  7: [
    { id: 13, author: "Procurement Manager", date: "2023-06-12", content: "Supplier account temporarily suspended due to delays." },
    { id: 14, author: "Admin User", date: "2023-06-01", content: "Account reactivated after issue resolution." }
  ],
  8: [
    { id: 15, author: "Quality Assurance", date: "2023-06-25", content: "All products passed quality inspection." },
    { id: 16, author: "Procurement Manager", date: "2023-06-15", content: "Supplier has excellent customer service." }
  ]
};

export default function SupplierProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get('id');
  
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (supplierId) {
      const id = parseInt(supplierId, 10);
      const foundSupplier = mockSuppliers.find(s => s.id === id);
      
      if (foundSupplier) {
        setSupplier(foundSupplier);
        setTransactions(mockTransactions[id] || []);
        setDocuments(mockDocuments[id] || []);
        setNotes(mockNotes[id] || []);
      } else {
        // Handle case where supplier is not found
        console.error(`Supplier with ID ${id} not found`);
        // Redirect to suppliers list or show error message
        router.push('/dashboard/user-management/manage-suppliers');
      }
    } else {
      // Handle case where no ID is provided
      console.error('No supplier ID provided');
      router.push('/dashboard/user-management/manage-suppliers');
    }
  }, [supplierId, router]);

  // Stats data based on supplier
  const stats = supplier ? [
    { 
      title: "Total Orders", 
      value: transactions.length.toString(), 
      icon: <FileTextOutlined className="w-5 h-5 text-[#2463EB]" />, 
      color: "bg-[#F6F9FF] border border-[#DBE9FE]",
      change: "+12%",
      changeColor: "text-green-500"
    },
    { 
      title: "Total Amount", 
      value: `RWF ${(transactions.reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}`, 
      icon: <DollarCircleOutlined className="w-5 h-5 text-green-500" />, 
      color: "bg-green-50",
      change: "+8%",
      changeColor: "text-green-500"
    },
    { 
      title: "On-time Delivery", 
      value: "92%", 
      icon: <CheckCircleOutlined className="w-5 h-5 text-blue-500" />, 
      color: "bg-blue-50",
      change: "+3%",
      changeColor: "text-green-500"
    },
    { 
      title: "Pending Orders", 
      value: transactions.filter(t => t.status === "Pending").length.toString(), 
      icon: <ExclamationCircleOutlined className="w-5 h-5 text-yellow-500" />, 
      color: "bg-yellow-50",
      change: "-2%",
      changeColor: "text-red-500"
    }
  ] : [];

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'User Management', href: '/dashboard/user-management' },
    { name: 'Manage Suppliers', href: '/dashboard/user-management/manage-suppliers' },
    { name: supplier ? supplier.name : 'Supplier Profile', current: true }
  ];

  // Handle connection toggle
  const handleConnectionToggle = () => {
    if (supplier) {
      setSupplier(prev => ({
        ...prev!,
        connectionStatus: prev!.connectionStatus === 'Connected' ? 'Disconnected' : 'Connected'
      }));
    }
  };

  // Show loading state while fetching data
  if (!supplierId) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading supplier profile...</div>
        </div>
      </div>
    );
  }

  // Show error state if supplier not found
  if (!supplier) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600">Supplier not found</div>
          <button 
            onClick={() => router.push('/dashboard/user-management/manage-suppliers')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Set dynamic page title */}
      <PageTitle title={`Supplier Profile - ${supplier.name}`} />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-800">Supplier Profile</h1>
          <div className="mt-2">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Icons Container */}
        <div className="flex items-center space-x-2">
          {/* Back to Suppliers Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => router.push('/dashboard/user-management/manage-suppliers')}
            title="Back to suppliers"
          >
            <UnorderedListOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
          
          {/* Edit Supplier Icon */}
          <div 
            className="h-8 w-8 rounded-[0.45rem] flex items-center justify-center border border-gray-800 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'rgb(249 250 251)', border: 'solid 1px rgb(31 41 55)', marginRight: '0.1rem', marginTop: '1.5em' }}
            onClick={() => console.log('Edit supplier')}
            title="Edit supplier"
          >
            <EditOutlined style={{ color: 'rgb(31 41 55)', fontSize: '16px' }} />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px bg-[#DDDDDD] mb-0 mx-1"></div>
      
      {/* Supplier Info and Stats Container */}
      <div className="border-t border-[#dddddd] pt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Supplier Info */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex items-start mb-4 md:mb-0">
              {/* Company Initials */}
              <div className="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold bg-blue-500 text-xl mr-4">
                {supplier.name.substring(0, 2).toUpperCase()}
              </div>
              
              {/* Supplier Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{supplier.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    supplier.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.status}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    supplier.connectionStatus === 'Connected' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.connectionStatus}
                  </span>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MailOutlined className="mr-2" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2" />
                    <span>TIN: {supplier.tinNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <FileTextOutlined className="mr-2" />
                    <span>{supplier.address}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection Toggle */}
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-600 mb-2">Connection Status</div>
              <div 
                className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  supplier.connectionStatus === 'Connected' 
                    ? 'bg-[#85ed68]' 
                    : 'bg-gray-300'
                }`}
                style={{ border: 'solid 1px #85ed68' }}
                onClick={handleConnectionToggle}
              >
                <div className={`bg-white rounded-full shadow-sm transform transition-transform ${
                  supplier.connectionStatus === 'Connected' ? 'translate-x-4' : ''
                }`}>
                  <div className="w-3 h-3"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider Line */}
          <div className="h-px bg-[#F2F2F2] mb-6 -mx-6"></div>
          
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white border border-gray-200 shadow-[-5px_5px_16px_6px_rgba(244,245,247,1)] hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                    <div className="flex items-baseline">
                      <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                      {stat.change && (
                        <span className={`ml-2 text-xs font-medium ${stat.changeColor}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Contact Person */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Person</h3>
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-purple-500 text-lg mr-3">
              {supplier.contactPerson.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-gray-800">{supplier.contactPerson}</div>
              <div className="text-sm text-gray-600">{supplier.contactEmail}</div>
              <div className="text-sm text-gray-600">{supplier.contactPhone}</div>
            </div>
          </div>
        </div>
        
        {/* Recent Notes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Notes</h3>
            <ActionButtons 
              onView={() => console.log('Add note clicked')}
              viewLabel="Add Note"
            />
          </div>
          
          <div className="space-y-4">
            {notes.slice(0, 2).map(note => (
              <div key={note.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-gray-800">{note.author}</div>
                  <div className="text-sm text-gray-500">{note.date}</div>
                </div>
                <div className="text-sm text-gray-600">{note.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
          <ActionButtons 
            onView={() => console.log('Upload document clicked')}
            viewLabel="Upload Document"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F1F4F9]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Document</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {documents.map(document => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileTextOutlined className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{document.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{document.type}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{document.date}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <ActionButtons 
                      onView={() => console.log(`View document ${document.id}`)}
                      onDelete={() => console.log(`Delete document ${document.id}`)}
                      viewLabel="View"
                      deleteLabel="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
          <ActionButtons 
            onView={() => console.log('View all transactions clicked')}
            viewLabel="View All"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F1F4F9]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Number</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F2F2]">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.date}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.orderNumber}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">RWF {transaction.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}