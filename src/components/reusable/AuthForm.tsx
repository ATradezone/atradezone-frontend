import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui'; // Import our new Input component

interface AuthFormProps {
  type: 'login' | 'register' | 'reset-password';
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(formData);
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  const getTitle = () => {
    switch (type) {
      case 'login': return 'Sign in to your account';
      case 'register': return 'Create a new account';
      case 'reset-password': return 'Reset your password';
      default: return '';
    }
  };

  const getSubmitButtonText = () => {
    switch (type) {
      case 'login': return 'Sign in';
      case 'register': return 'Create account';
      case 'reset-password': return 'Send reset link';
      default: return 'Submit';
    }
  };

  const getFooterText = () => {
    switch (type) {
      case 'login': return "Don't have an account?";
      case 'register': return "Already have an account?";
      case 'reset-password': return "Remember your password?";
      default: return '';
    }
  };

  const getFooterLink = () => {
    switch (type) {
      case 'login': return { text: 'Sign up', href: '/auth/register' };
      case 'register': return { text: 'Sign in', href: '/auth/login' };
      case 'reset-password': return { text: 'Sign in', href: '/auth/login' };
      default: return { text: '', href: '' };
    }
  };

  const getForgotPasswordLink = () => {
    return { text: 'Forgot your password?', href: '/auth/reset-password' };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {getTitle()}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {type === 'register' && (
              <Input
                label=""
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            )}
            <Input
              label=""
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
            />
            {type !== 'reset-password' && (
              <Input
                label=""
                id="password"
                name="password"
                type="password"
                autoComplete={type === 'login' ? "current-password" : "new-password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            )}
            {type === 'register' && (
              <Input
                label=""
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            )}
          </div>

          {type === 'login' && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span 
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => handleLinkClick('/auth/reset-password')}
                >
                  {getForgotPasswordLink().text}
                </span>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                getSubmitButtonText()
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {getFooterText()}{' '}
            <span 
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              onClick={() => handleLinkClick(getFooterLink().href)}
            >
              {getFooterLink().text}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;