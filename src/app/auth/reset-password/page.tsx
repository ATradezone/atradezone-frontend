'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Alert } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '../components/AuthBranding';
import AuthFormSkeleton from '../components/AuthFormSkeleton';
import { Validation } from '@/components/shared';
import Input from '@/components/ui/Input'; // Import custom Input component

export default function ResetPassword() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
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
      setValidationMessage('Password reset instructions sent successfully');
      setValidationType('success');
      setShowValidation(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle password reset logic here
      setEmailSent(true);
    } catch (error) {
      // Show error message
      setValidationMessage('Failed to send password reset instructions. Please try again.');
      setValidationType('error');
      setShowValidation(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmailSent(false);
    form.resetFields();
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Set dynamic page title */}
        <PageTitle title="Reset Password" />
        
        {/* Left Side - Branding & Sign Up CTA */}
        <AuthBranding />  
        {/* Right Side - Password Reset Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-0">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-6 sm:mb-8">
              <div className="h-12 w-auto object-contain mx-auto mb-2 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
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
      <PageTitle title="Reset Password" />
      
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
      {/* Right Side - Password Reset Form */}
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
          
          {!emailSent ? (
            <>
              <div className="mb-6 sm:mb-8 text-center lg:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Afacad', sans-serif" }}>Reset Password</h1>
                <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5', fontFamily: "'Afacad', sans-serif" }}>
                  Enter your email and we'll send you<br />instructions to reset your password
                </p>
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
                  name="resetPassword"
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
                    className="h-10 sm:h-12 rounded-lg text-sm sm:text-base w-full"
                    style={{ paddingLeft: '36px', fontFamily: "'Afacad', sans-serif" }} // Adjusted padding to accommodate prefix
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => {
                      form.submit();
                    }}
                    className="w-full h-9 sm:h-10 rounded-full text-sm sm:text-base" // Changed h-10 sm:h-12 to h-9 sm:h-10
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                  >
                    {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
                  </Button>
                </Form.Item>
                </Form>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <span 
                  className="inline-flex items-center text-sm sm:text-base font-medium cursor-pointer rounded-[0.45rem] px-3 py-1 border border-gray-800 shadow-sm"
                  style={{ backgroundColor: 'rgb(249 250 251)', borderColor: 'rgb(31 41 55)', color: 'rgb(31 41 55)', fontFamily: "'Afacad', sans-serif" }}
                  onClick={() => router.push('/auth/login')}
                >
                  <ArrowLeftOutlined className="mr-2" style={{ color: 'rgb(31 41 55)' }} />
                  Back to Sign In
                </span>
              </div>
            </>
          ) : (
            <div 
              className="p-6 sm:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] text-center"
              style={{
                boxShadow: '-5px 5px 50px -5px #e1e1e1',
                fontFamily: "'Afacad', sans-serif"
              }}
            >
              <div className="mb-6 text-center lg:text-left">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <MailOutlined className="text-2xl" style={{ color: '#2663eb' }} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Afacad', sans-serif" }}>Check Your Email</h2>
                <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5', fontFamily: "'Afacad', sans-serif" }}>
                  We've sent password reset instructions to<br />
                  <span className="font-semibold text-gray-900" style={{ fontFamily: "'Afacad', sans-serif" }}>{form.getFieldValue('email')}</span>
                </p>
              </div>

              <Alert
                message="Didn't receive the email?"
                description={
                  <div className="text-left text-xs sm:text-sm" style={{ fontFamily: "'Afacad', sans-serif" }}>
                    <p>• Check your spam folder</p>
                    <p>• Make sure you entered the correct email address</p>
                  </div>
                }
                type="info"
                showIcon
                className="mb-6 text-left"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Button
                  variant="primary"
                  type="button"
                  onClick={resetForm}
                  className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base" // Changed h-10 sm:h-12 to h-9 sm:h-10
                  style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                  Resend Email
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base" // Changed h-10 sm:h-12 to h-9 sm:h-10
                  style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                  Back to Sign In
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}