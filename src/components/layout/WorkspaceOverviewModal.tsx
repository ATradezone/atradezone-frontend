'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // 👈 Add this
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Modal from '../ui/Modal';
import Button from '../ui/Button'; // Import the Button component

interface WorkspaceData {
  id: number;
  name: string;
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
  status: 'active' | 'disabled';
}

const WorkspaceOverviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter(); // 👈 Initialize router

  // ... (all your existing mock data and calculations remain unchanged)

  const workspaces: WorkspaceData[] = [
    {
      id: 1,
      name: 'Main Headquarters',
      totalUsers: 125,
      activeUsers: 110,
      disabledUsers: 15,
      status: 'active',
    },
    {
      id: 2,
      name: 'Regional Office',
      totalUsers: 87,
      activeUsers: 78,
      disabledUsers: 9,
      status: 'active',
    },
    {
      id: 3,
      name: 'Branch Office',
      totalUsers: 42,
      activeUsers: 35,
      disabledUsers: 7,
      status: 'disabled',
    },
  ];

  const totalWorkspaces = workspaces.length;
  const activeWorkspaces = workspaces.filter((w) => w.status === 'active').length;
  const disabledWorkspaces = workspaces.filter((w) => w.status === 'disabled').length;

  const totalUsers = workspaces.reduce((sum, workspace) => sum + workspace.totalUsers, 0);
  const activeUsers = workspaces.reduce((sum, workspace) => sum + workspace.activeUsers, 0);
  const disabledUsers = workspaces.reduce((sum, workspace) => sum + workspace.disabledUsers, 0);

  const workspaceStatusData = [
    { name: 'Active', value: activeWorkspaces },
    { name: 'Disabled', value: disabledWorkspaces },
  ];

  const userStatusData = [
    { name: 'Active', value: activeUsers },
    { name: 'Disabled', value: disabledUsers },
  ];

  const COLORS = ['#85ed68', '#eaecf0'];
  const USER_COLORS = ['#85ed68', '#FF346A'];

  const workspaceUsersData = workspaces.map((workspace) => ({
    name: workspace.name,
    total: workspace.totalUsers,
    active: workspace.activeUsers,
    disabled: workspace.disabledUsers,
  }));

  // Footer definition
  const footer = (
    <div className="flex justify-between w-full">
      <Button
        variant="secondary"
        onClick={() => router.push('/settings/company')}
      >
        Company Settings
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          // You can replace this with actual logic later
          alert('Add New Branch clicked');
        }}
      >
        Add New Branch
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Workspace"
      subtitle="Workspace information"
      maxWidth="max-w-6xl"
      footer={footer} // Pass footer here
    >
      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[60vh] pr-2">
        <div className="space-y-4 pb-4">
          {/* All your existing content remains unchanged */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* ... (cards) ... */}
            <div className="rounded-lg p-3 border border-blue-200 bg-blue-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Workspaces</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-bold text-blue-800">{totalWorkspaces}</p>
                  <p className="text-xs text-gray-600">Total Workspaces</p>
                </div>
                <div className="bg-blue-500 rounded-md" style={{ padding: '0.25rem 0.5rem' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6666 6.66669V12C14.6666 12.3536 14.5261 12.6927 14.276 12.9428C14.0259 13.1929 13.6868 13.3334 13.3333 13.3334H2.66663C2.31301 13.3334 1.97387 13.1929 1.72377 12.9428C1.47368 12.6927 1.33329 12.3536 1.33329 12V6.66669" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33329 13.3334V8.00002C5.33329 7.6464 5.47377 7.30726 5.72386 7.05717C5.97396 6.80707 6.31309 6.66669 6.66663 6.66669H9.33329C9.68691 6.66669 10.026 6.80707 10.2761 7.05717C10.5262 7.30726 10.6666 7.6464 10.6666 8.00002V13.3334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33329 4.00002L7.99996 1.33337L14.6666 4.00002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-1 flex space-x-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: 'rgb(133 237 104)' }}></div>
                  <span className="text-xs" style={{ color: '#01363C' }}>{activeWorkspaces} Active</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                  <span className="text-xs" style={{ color: '#01363C' }}>{disabledWorkspaces} Disabled</span>
                </div>
              </div>
              <div className="mt-1">
                <p className="text-xs text-gray-600">Across {workspaces.length} locations</p>
              </div>
            </div>

            <div className="rounded-lg p-3 border border-green-200 bg-green-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Users</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-bold text-green-800">{totalUsers}</p>
                  <p className="text-xs text-gray-600">Total Users</p>
                </div>
                <div className="rounded-md" style={{ backgroundColor: 'rgb(133 237 104)', padding: '0.25rem 0.5rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-1 flex space-x-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: 'rgb(133 237 104)' }}></div>
                  <span className="text-xs" style={{ color: '#01363C' }}>{activeUsers} Active</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                  <span className="text-xs" style={{ color: '#01363C' }}>{disabledUsers} Disabled</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-3 border border-purple-200 bg-purple-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Branches</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-bold text-purple-800">{workspaces.length}</p>
                  <p className="text-xs text-gray-600">Total Branches</p>
                </div>
                <div className="bg-purple-500 rounded-md" style={{ padding: '0.25rem 0.5rem' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6666 6.66669V12C14.6666 12.3536 14.5261 12.6927 14.276 12.9428C14.0259 13.1929 13.6868 13.3334 13.3333 13.3334H2.66663C2.31301 13.3334 1.97387 13.1929 1.72377 12.9428C1.47368 12.6927 1.33329 12.3536 1.33329 12V6.66669" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33329 13.3334V8.00002C5.33329 7.6464 5.47377 7.30726 5.72386 7.05717C5.97396 6.80707 6.31309 6.66669 6.66663 6.66669H9.33329C9.68691 6.66669 10.026 6.80707 10.2761 7.05717C10.5262 7.30726 10.6666 7.6464 10.6666 8.00002V13.3334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.33329 4.00002L7.99996 1.33337L14.6666 4.00002" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-1">
                <p className="text-xs" style={{ color: '#01363C' }}>Across {workspaces.length} locations</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Workspace Status</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workspaceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={(props: any) => {
                        const { name, percent } = props;
                        return `${name}: ${(percent * 100).toFixed(0)}%`;
                      }}
                    >
                      {workspaceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [value, 'Workspaces']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">User Status</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={(props: any) => {
                        const { name, percent } = props;
                        return `${name}: ${(percent * 100).toFixed(0)}%`;
                      }}
                    >
                      {userStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={USER_COLORS[index % USER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [value, 'Users']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Workspace Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Workspace</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Active</th>
                    <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Disabled</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workspaces.map((workspace) => (
                    <tr key={workspace.id} className="hover:bg-gray-50">
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-5 w-5">
                            <div className="bg-blue-100 rounded-md w-5 h-5 flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                                <path d="M14.6666 6.66669V12C14.6666 12.3536 14.5261 12.6927 14.276 12.9428C14.0259 13.1929 13.6868 13.3334 13.3333 13.3334H2.66663C2.31301 13.3334 1.97387 13.1929 1.72377 12.9428C1.47368 12.6927 1.33329 12.3536 1.33329 12V6.66669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.33329 13.3334V8.00002C5.33329 7.6464 5.47377 7.30726 5.72386 7.05717C5.97396 6.80707 6.31309 6.66669 6.66663 6.66669H9.33329C9.68691 6.66669 10.026 6.80707 10.2761 7.05717C10.5262 7.30726 10.6666 7.6464 10.6666 8.00002V13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.33329 4.00002L7.99996 1.33337L14.6666 4.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-1">
                            <div className="font-medium text-gray-900 text-xs">{workspace.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span
                          className={`px-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                            workspace.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {workspace.status === 'active' ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-xs">{workspace.totalUsers}</td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-xs">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: 'rgb(133 237 104)' }}></div>
                          {workspace.activeUsers}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-gray-500 text-xs">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1"></div>
                          {workspace.disabledUsers}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Users by Workspace</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={workspaceUsersData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={30} tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 8 }} />
                  <Tooltip />
                  <Bar dataKey="total" name="Total" fill="#85ed68" />
                  <Bar dataKey="active" name="Active" fill="#4ade80" />
                  <Bar dataKey="disabled" name="Disabled" fill="#FF346A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WorkspaceOverviewModal;