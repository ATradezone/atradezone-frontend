'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '../components/AuthBranding';
import AuthFormSkeleton from '../components/AuthFormSkeleton';
import { Validation } from '@/components/shared';
import Input from '@/components/ui/Input';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationType, setValidationType] = useState<'success' | 'error'>('success');

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Show success message
      setValidationMessage('Login form submitted successfully');
      setValidationType('success');
      setShowValidation(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle login logic here
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      // Show error message
      setValidationMessage('Login failed. Please check your credentials.');
      setValidationType('error');
      setShowValidation(true);
    } finally {
      setLoading(false);
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Set dynamic page title */}
        <PageTitle title="Sign In" />
        
        {/* Left Side - Branding & Sign Up CTA */}
        <AuthBranding />
        {/* Right Side - Clean Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-6 sm:mb-8">
              <div className="h-12 w-auto object-contain mx-auto mb-2 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
            
            <AuthFormSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Set dynamic page title */}
      <PageTitle title="Sign In" />
      
      {/* Validation Component */}
      {showValidation && (
        <Validation 
          message={validationMessage} 
          description={validationMessage}
          type={validationType} 
          onClose={() => setShowValidation(false)} 
        />
      )}
      
      {/* Left Side - Branding & Sign Up CTA */}
      <AuthBranding />
      {/* Right Side - Clean Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6 sm:mb-8">
            <img 
              src="/images/atradezone-logo-big-size.png" 
              alt="ATradezone Logo" 
              className="h-10 sm:h-12 w-auto object-contain mx-auto mb-2"
            />
          </div>
          
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Afacad', sans-serif" }}>Sign In</h1>
            <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5', fontFamily: "'Afacad', sans-serif" }}>Welcome back!<br />Please enter your details</p>
          </div>
          
          <div 
            className="p-6 sm:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1]"
            style={{
              boxShadow: '-5px 5px 50px -5px #e1e1e1',
              fontFamily: "'Afacad', sans-serif"
            }}
          >
            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-semibold text-sm sm:text-base" style={{ fontFamily: "'Afacad', sans-serif" }}>Email</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />}
                placeholder="Enter your email" 
                className="h-9 sm:h-10 rounded-lg text-sm sm:text-base w-full"
                  
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label={<span className="text-gray-700 font-semibold text-sm sm:text-base" style={{ fontFamily: "'Afacad', sans-serif" }}>Password</span>}
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />}
                placeholder="Enter your password"
                className="h-9 sm:h-10 rounded-lg text-sm sm:text-base w-full"
                  
              />
            </Form.Item>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <Form.Item name="remember" valuePropName="checked" className="!mb-0">
                <Checkbox className="text-xs sm:text-sm" style={{ fontFamily: "'Afacad', sans-serif" }}>Remember me</Checkbox>
              </Form.Item>
              <span 
                className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium cursor-pointer" 
                onClick={() => router.push('/auth/reset-password')}
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Forgot password?
              </span>
            </div>
            
            <Form.Item>
              <Button
                variant="primary"
                type="submit"
                className="w-full h-9 sm:h-10 rounded-full text-sm sm:text-base"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Form.Item>
            </Form>
          </div>
          
          <div className="mt-4 sm:mt-6">
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500" style={{ fontFamily: "'Afacad', sans-serif" }}>Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                <img 
                  src="/images/googleg_standard_color_18dp.png" 
                  alt="Google" 
                  className="h-5 w-5"
                />
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.5 6.5c0-.3-.1-.6-.3-.8l-1.1-1.1c-.2-.2-.5-.3-.8-.3H3.7c-.3 0-.6.1-.8.3L1.8 5.7c-.2.2-.3.5-.3.8v11c0 .3.1.6.3.8l1.1 1.1c.2.2.5.3.8.3h16.6c.3 0 .6-.1.8-.3l1.1-1.1c.2-.2.3-.5.3-.8v-11zM21 18l-1.5 1.5H4.5L3 18V7l1.5-1.5h15L21 7v11z" />
                  <path d="M18 8l-6 4.5L6 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="ml-2">Outlook</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Afacad', sans-serif" }}>
              Don't have an account?{' '}
              <span 
                className="text-emerald-600 hover:text-[#29DB5C] font-medium transition-colors cursor-pointer" 
                onClick={() => router.push('/auth/register')}
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Create account
              </span>
            </p>
          </div>
          
          {/* legal - Separate at very bottom */}
          <div className="mt-8 pt-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: "'Afacad', sans-serif" }}>
              By signing in, you agree to our{' '}
              <span 
                className="text-emerald-600 hover:text-[#29DB5C] transition-colors cursor-pointer" 
                onClick={() => {
                  window.open('https://www.atradezone.com/legal', '_blank');
                }}
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Terms of Service
              </span>
              {' '}and{' '}
              <span 
                className="text-emerald-600 hover:text-[#29DB5C] transition-colors cursor-pointer" 
                onClick={() => {
                  window.open('https://www.atradezone.com/legal', '_blank');
                }}
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;