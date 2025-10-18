'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MailOutlined } from '@ant-design/icons';
import Button from '@/components/ui/Button';
import PageTitle from '@/components/ui/PageTitle';
import AuthBranding from '@/app/auth/components/AuthBranding';
import { Alert } from 'antd';

export default function VerifyAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get business name and email from query parameters
  const businessName = searchParams.get('businessName') || '';
  const email = searchParams.get('email') || '';

  const handleResendEmail = () => {
    // In a real application, this would trigger an API call to resend the verification email
    console.log('Resend verification email');
  };

  const handleBackToSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Set dynamic page title */}
      <PageTitle title="Verify Your Account" />
      
      {/* Left Side - Branding */}
      <AuthBranding />
      
      {/* Right Side - Verification Message */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-20 bg-white min-h-screen lg:min-h-screen">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6 sm:mb-8">
            <img 
              src="/images/atradezone-logo-big-size.png" 
              alt="ATradezone Logo" 
              className="h-10 sm:h-12 w-auto object-contain mx-auto mb-2"
            />
          </div>
          
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Afacad', sans-serif" }}>Verify Your Account</h2>
              <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5', fontFamily: "'Afacad', sans-serif" }}>
                We've sent a verification email to<br />
                <span className="font-semibold text-gray-900" style={{ fontFamily: "'Afacad', sans-serif" }}>{email || 'your email address'}</span>
              </p>
            </div>

            <div className="mb-6 text-center lg:text-left">
              <p className="text-sm sm:text-base text-gray-700 mb-4" style={{ fontFamily: "'Afacad', sans-serif" }}>
                Please check your email and follow the instructions to verify your account.
              </p>
            </div>

            <Alert
              message="Didn't receive the email?"
              description={
                <div className="text-left text-xs sm:text-sm" style={{ fontFamily: "'Afacad', sans-serif" }}>
                  <p>• Check your spam folder</p>
                  <p>• Make sure you entered the correct email address</p>
                  <p>• Wait a few minutes for the email to arrive</p>
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
                onClick={handleResendEmail}
                className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Resend Email
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleBackToSignIn}
                className="flex-1 h-9 sm:h-10 rounded-full text-sm sm:text-base"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}