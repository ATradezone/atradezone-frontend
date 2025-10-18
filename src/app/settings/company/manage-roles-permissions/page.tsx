'use client';

import React, { useState, useEffect } from 'react';
import CompanySettingsSidebar from '../../components/CompanySettingsSidebar';
import ManageRolesPermissionsSkeleton from './components/ManageRolesPermissionsSkeleton';
import StatCard from '@/components/ui/StatCard';
import PageTitle from '@/components/ui/PageTitle';
import { Input, TextArea } from '@/components/ui';
import AutoCompleteSelect from '@/components/ui/AutoCompleteSelect';
import { ActionButtons } from '@/components/reusable';
import Button from '@/components/ui/Button';

const ManageRolesPermissionsPage = () => {
  const [loading, setLoading] = useState(true);
  
  // Form state for users
  const [usersData, setUsersData] = useState({
    userName: '',
    userEmail: '',
    userRole: 'Staff',
    userWorkspace: '',
    userPassword: '',
    confirmPassword: ''
  });

  // Form state for roles
  const [rolesData, setRolesData] = useState({
    roleName: '',
    roleDescription: '',
    permissions: [] as string[]
  });

  // Form state for permissions
  const [permissionsData, setPermissionsData] = useState({
    permissionName: '',
    permissionDescription: '',
    category: 'General'
  });

  // Sample users data
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Staff', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Staff', status: 'Active' }
  ]);

  // Sample roles data
  const [rolesList, setRolesList] = useState([
    { id: 1, name: 'Administrator', description: 'Full access to all system features', users: 2, permissions: 45 },
    { id: 2, name: 'Manager', description: 'Access to management features', users: 5, permissions: 32 },
    { id: 3, name: 'Sales Representative', description: 'Access to sales features', users: 12, permissions: 18 },
    { id: 4, name: 'Inventory Manager', description: 'Access to inventory features', users: 3, permissions: 22 }
  ]);

  // Sample permissions data
  const [permissionsList, setPermissionsList] = useState([
    { id: 1, name: 'View Dashboard', description: 'Allow access to dashboard', category: 'General', roles: 4 },
    { id: 2, name: 'Manage Users', description: 'Allow user management', category: 'User Management', roles: 2 },
    { id: 3, name: 'Manage Roles', description: 'Allow role management', category: 'User Management', roles: 2 },
    { id: 4, name: 'Manage Products', description: 'Allow product management', category: 'Product Management', roles: 3 },
    { id: 5, name: 'View Sales Reports', description: 'Allow access to sales reports', category: 'Reports', roles: 3 },
    { id: 6, name: 'Process Orders', description: 'Allow order processing', category: 'Sales', roles: 2 },
    { id: 7, name: 'Manage Inventory', description: 'Allow inventory management', category: 'Inventory', roles: 2 },
    { id: 8, name: 'View Financial Reports', description: 'Allow access to financial reports', category: 'Reports', roles: 1 }
  ]);

  // Role options
  const roleOptions = [
    'Admin',
    'Manager',
    'Staff',
    'Inventory Manager',
    'Sales Representative'
  ];

  // Workspace options
  const workspaceOptions = [
    'Main Office',
    'Branch Office A',
    'Branch Office B',
    'Remote Team',
    'Headquarters'
  ];

  // Permission categories
  const categories = [
    'General',
    'User Management',
    'Product Management',
    'Sales',
    'Inventory',
    'Reports',
    'Settings'
  ];

  // Sample permissions for role creation
  const permissionsListForRoles = [
    'View Dashboard',
    'Manage Users',
    'Manage Roles',
    'Manage Products',
    'View Sales Reports',
    'Process Orders',
    'Manage Inventory',
    'View Financial Reports',
    'Manage Suppliers',
    'Manage Customers'
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle user form input changes
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsersData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle role form input changes
  const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRolesData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle permission form input changes
  const handlePermissionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPermissionsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle permission selection for roles
  const handlePermissionChange = (permission: string) => {
    setRolesData(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      return {
        ...prev,
        permissions: newPermissions
      };
    });
  };

  // Handle user form submission
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usersData.userPassword !== usersData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('User data submitted:', usersData);
    alert('User added successfully!');
    setUsersData({
      userName: '',
      userEmail: '',
      userRole: 'Staff',
      userWorkspace: '',
      userPassword: '',
      confirmPassword: ''
    });
  };

  // Handle role form submission
  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Role data submitted:', rolesData);
    alert('Role saved successfully!');
    setRolesData({
      roleName: '',
      roleDescription: '',
      permissions: []
    });
  };

  // Handle permission form submission
  const handlePermissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Permission data submitted:', permissionsData);
    alert('Permission saved successfully!');
    setPermissionsData({
      permissionName: '',
      permissionDescription: '',
      category: 'General'
    });
  };

  // Handle user deletion
  const handleDeleteUser = (id: number) => {
    setUsersList(prev => prev.filter(user => user.id !== id));
    alert('User deleted successfully!');
  };

  // Handle role deletion
  const handleDeleteRole = (id: number) => {
    setRolesList(prev => prev.filter(role => role.id !== id));
    alert('Role deleted successfully!');
  };

  // Handle permission deletion
  const handleDeletePermission = (id: number) => {
    setPermissionsList(prev => prev.filter(permission => permission.id !== id));
    alert('Permission deleted successfully!');
  };

  if (loading) {
    return <ManageRolesPermissionsSkeleton />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageTitle title="Manage Roles & Permissions" />
      <div className="flex h-fit bg-gray-50 rounded-xl">
        {/* Sidebar */}
        <div className="w-50 bg-white border-r border-gray-200 p-33 rounded-xl h-fit sticky top-20">
          <CompanySettingsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto rounded-r-xl" style={{ marginTop: '0rem', marginLeft: '1.5rem' }}>
          <>
            {/* Permissions Management Section */}
            <div id="permissions" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm">
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">MANAGE PERMISSIONS</h2>
              </div>
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Permissions List */}
                <StatCard title="Existing Permissions" className="p-4 overflow-hidden">
                  <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {permissionsList.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">{permission.name}</h3>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                          <div className="flex space-x-4 mt-1">
                            <span className="text-xs text-gray-500">{permission.category}</span>
                            <span className="text-xs text-gray-500">{permission.roles} roles</span>
                          </div>
                        </div>
                        {/* Icon-only Edit & Delete */}
                        <ActionButtons
                          onEdit={() => alert(`Edit permission: ${permission.name}`)}
                          editLabel={`Edit ${permission.name}`}
                          onDelete={() => handleDeletePermission(permission.id)}
                          deleteLabel={`Delete ${permission.name}`}
                          onView={undefined}
                        />
                      </div>
                    ))}
                  </div>
                </StatCard>
                
                {/* Add New Permission Form */}
                <StatCard title="Add New Permission" className="p-4">
                  <div className="h-px bg-[#EAECF0] my-4"></div>
                  <form onSubmit={handlePermissionSubmit}>
                    <div className="mb-4">
                      <Input
                        label="Permission Name"
                        name="permissionName"
                        value={permissionsData.permissionName}
                        onChange={(e) => handlePermissionInputChange(e)}
                        placeholder="Enter permission name"
                        required
                        className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4" >
                      <TextArea
                        label="Description"
                        name="permissionDescription"
                        value={permissionsData.permissionDescription}
                        onChange={(e) => handlePermissionInputChange(e)}
                        placeholder="Enter permission description"
                        rows={3}
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <AutoCompleteSelect
                        label="Category"
                        name="category"
                        value={permissionsData.category}
                        onChange={(value) => setPermissionsData(prev => ({ ...prev, category: value }))}
                        options={categories.map((category, index) => ({
                          value: category,
                          label: category
                        }))}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Save Permission
                      </Button>
                    </div>
                  </form>
                </StatCard>
              </div>
            </div>

            {/* Roles Management Section */}
            <div id="roles" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">MANAGE ROLES</h2>
              </div>
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Roles List */}
                <StatCard title="Existing Roles" className="p-4 overflow-hidden">
                  <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {rolesList.map((role) => (
                      <div key={role.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">{role.name}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                          <div className="flex space-x-4 mt-1">
                            <span className="text-xs text-gray-500">{role.users} users</span>
                            <span className="text-xs text-gray-500">{role.permissions} permissions</span>
                          </div>
                        </div>
                        {/* Icon-only Edit & Delete */}
                        <ActionButtons
                          onEdit={() => alert(`Edit role: ${role.name}`)}
                          editLabel={`Edit ${role.name}`}
                          onDelete={() => handleDeleteRole(role.id)}
                          deleteLabel={`Delete ${role.name}`}
                          onView={undefined}
                        />
                      </div>
                    ))}
                  </div>
                </StatCard>
                
                {/* Add New Role Form */}
                <StatCard title="Add New Role" className="p-4">
                  <div className="h-px bg-[#EAECF0] my-4"></div>
                  <form onSubmit={handleRoleSubmit}>
                    <div className="mb-4">
                      <Input
                        label="Role Name"
                        name="roleName"
                        value={rolesData.roleName}
                        onChange={(e) => handleRoleInputChange(e)}
                        placeholder="Enter role name"
                        required
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <TextArea
                        label="Description"
                        name="roleDescription"
                        value={rolesData.roleDescription}
                        onChange={(e) => handleRoleInputChange(e)}
                        placeholder="Enter role description"
                        rows={3}
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                      <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
                        {permissionsListForRoles.map((permission, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`permission-${index}`}
                              checked={rolesData.permissions.includes(permission)}
                              onChange={() => handlePermissionChange(permission)}
                              className="mr-2"
                            />
                            <label htmlFor={`permission-${index}`} className="text-sm text-gray-700">
                              {permission}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Save Role
                      </Button>
                    </div>
                  </form>
                </StatCard>
              </div>
            </div>

            {/* Manage Users Section */}
            <div id="users" className="bg-white rounded-xl p-6 mb-6 pt-0 shadow-sm" style={{ scrollMarginTop: '3rem' }}>
              <div className="flex items-center mb-0">
                <div className="w-3 h-6 bg-[rgb(133,237,104)] rounded mr-3"></div>
                <h2 className="text-lg font-semibold text-gray-800">MANAGE USERS</h2>
              </div>
              <div className="h-px bg-[#EAECF0] mt-2 -mx-6 mb-6"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Users List */}
                <StatCard title="Existing Users" className="p-4 overflow-hidden">
                  <div className="h-px bg-[#EAECF0] my-4 -mx-4"></div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {usersList.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex space-x-4 mt-1">
                            <span className="text-xs text-gray-500">{user.role}</span>
                            <span className={`text-xs ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                        {/* Icon-only Edit & Delete */}
                        <ActionButtons
                          onEdit={() => alert(`Edit user: ${user.name}`)}
                          editLabel={`Edit ${user.name}`}
                          onDelete={() => handleDeleteUser(user.id)}
                          deleteLabel={`Delete ${user.name}`}
                          onView={undefined}
                        />
                      </div>
                    ))}
                  </div>
                </StatCard>
                
                {/* Add New User Form */}
                <StatCard title="Add New User" className="p-4">
                  <div className="h-px bg-[#EAECF0] my-4"></div>
                  <form onSubmit={handleUserSubmit}>
                    <div className="mb-4">
                      <Input
                        label="User Name"
                        name="userName"
                        value={usersData.userName}
                        onChange={(e) => handleUserInputChange(e)}
                        placeholder="Enter user name"
                        required
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Input
                        label="Email Address"
                        name="userEmail"
                        value={usersData.userEmail}
                        onChange={handleUserInputChange}
                        placeholder="Enter email address"
                        required
                        type="email"
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <AutoCompleteSelect
                        label="Workspace"
                        name="userWorkspace"
                        value={usersData.userWorkspace}
                        onChange={(value) => setUsersData(prev => ({ ...prev, userWorkspace: value }))}
                        options={[{ value: '', label: 'Select a workspace' }, ...workspaceOptions.map((workspace, index) => ({
                          value: workspace,
                          label: workspace
                        }))]}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Input
                        label="Password"
                        name="userPassword"
                        value={usersData.userPassword}
                        onChange={handleUserInputChange}
                        placeholder="Enter password"
                        required
                        type="password"
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        value={usersData.confirmPassword}
                        onChange={handleUserInputChange}
                        placeholder="Confirm password"
                        required
                        type="password"
                         className="pr-0"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <AutoCompleteSelect
                        label="Role"
                        name="userRole"
                        value={usersData.userRole}
                        onChange={(value) => setUsersData(prev => ({ ...prev, userRole: value }))}
                        options={roleOptions.map((role, index) => ({
                          value: role,
                          label: role
                        }))}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Add User
                      </Button>
                    </div>
                  </form>
                </StatCard>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ManageRolesPermissionsPage;