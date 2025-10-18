'use client';

import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'register' | 'reset-password';
  onSubmit: (values: any) => void;
  loading: boolean;
  emailSent?: boolean;
  onResetForm?: () => void;
  email?: string;
  isLoading?: boolean;
}

const AuthForm = ({ type, onSubmit, loading, emailSent, onResetForm, email, isLoading }: AuthFormProps) => {
  const [form] = Form.useForm();
  const router = useRouter();

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div 
        className="p-4 sm:p-6 lg:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] animate-pulse"
        style={{
          boxShadow: '-5px 5px 50px -5px #e1e1e1'
        }}
      >
        {/* Business Name Field Skeleton (Register only) */}
        {type === 'register' && (
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        )}

        {/* Email Field Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Password Field Skeleton */}
        {type !== 'reset-password' && (
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        )}

        {/* Confirm Password Field Skeleton (Register only) */}
        {type === 'register' && (
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
        )}

        {/* Remember Me / Forgot Password Skeleton (Login only) */}
        {type === 'login' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        )}

        {/* Agreement Checkbox Skeleton (Register only) */}
        {type === 'register' && (
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        )}

        {/* Submit Button Skeleton */}
        <div className="h-12 bg-gray-300 rounded-lg mb-6"></div>

        {/* Or continue with section skeleton */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-2 bg-white">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Social login buttons skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="h-10 bg-gray-200 rounded-md"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>

        {/* Footer link skeleton */}
        <div className="text-center">
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleFinish = async (values: any) => {
    onSubmit(values);
  };

  const resetForm = () => {
    if (onResetForm) {
      onResetForm();
    }
    form.resetFields();
  };

  if (type === 'reset-password' && emailSent) {
    return (
      <div 
        className="p-4 sm:p-6 lg:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1] text-center"
        style={{
          boxShadow: '-5px 5px 50px -5px #e1e1e1'
        }}
      >
        <div className="mb-6 text-center lg:text-left">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
            <MailOutlined className="text-2xl text-emerald-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-sm sm:text-base text-gray-600" style={{ color: '#6E82A5' }}>
            We've sent password reset instructions to<br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <Alert
          message="Didn't receive the email?"
          description={
            <div className="text-left text-xs sm:text-sm">
              <p>• Check your spam folder</p>
              <p>• Make sure the email address is correct</p>
              <p>• Try requesting another reset email</p>
            </div>
          }
          type="info"
          showIcon
          className="mb-6 text-left"
        />

        <Button 
          type="primary" 
          htmlType="button"
          onClick={resetForm}
          className="w-full h-10 sm:h-12 bg-emerald-600 hover:bg-emerald-700 border-none text-sm sm:text-base font-semibold text-white"
          size="large"
        >
          Try Another Email
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="p-4 sm:p-6 lg:p-8 rounded-[15px] sm:rounded-[20px] border border-[#e1e1e1]"
      style={{
        boxShadow: '-5px 5px 50px -5px #e1e1e1'
      }}
    >
      <Form
        form={form}
        name={type}
        onFinish={handleFinish}
        layout="vertical"
        className="space-y-4"
      >
        {type === 'register' && (
          <Form.Item
            name="fullName"
            label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Business Name</span>}
            rules={[
              { required: true, message: 'Please enter your business name' },
              { min: 2, message: 'Name must be at least 2 characters' },
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />} 
              placeholder="Enter your full name" 
              className="h-10 sm:h-12 rounded-lg text-sm sm:text-base"
              size="large"
              style={{ paddingLeft: '12px' }}
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Email</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input 
            prefix={<MailOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />} 
            placeholder="Enter your email" 
            className="h-10 sm:h-12 rounded-lg text-sm sm:text-base"
            size="large"
            style={{ paddingLeft: '12px' }}
          />
        </Form.Item>

        {type !== 'reset-password' && (
          <>
            <Form.Item
              name="password"
              label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Password</span>}
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />} 
                placeholder="Enter your password"
                className="h-10 sm:h-12 rounded-lg text-sm sm:text-base"
                size="large"
                style={{ paddingLeft: '12px' }}
              />
            </Form.Item>

            {type === 'register' && (
              <Form.Item
                name="confirmPassword"
                label={<span className="text-gray-700 font-semibold text-sm sm:text-base">Confirm Password</span>}
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="text-gray-400 text-sm sm:text-base" style={{ fontSize: '14px' }} />} 
                  placeholder="Confirm your password"
                  className="h-10 sm:h-12 rounded-lg text-sm sm:text-base"
                  size="large"
                  style={{ paddingLeft: '12px' }}
                />
              </Form.Item>
            )}
          </>
        )}

        {type === 'login' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <Form.Item name="remember" valuePropName="checked" className="!mb-0">
              <Checkbox className="text-xs sm:text-sm">Remember me</Checkbox>
            </Form.Item>
            <span 
              className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium cursor-pointer" 
              onClick={() => router.push('/auth/reset-password')}
            >
              Forgot password?
            </span>
          </div>
        )}

        {type === 'register' && (
          <div className="mb-4 sm:mb-6">
            <Form.Item 
              name="agreement" 
              valuePropName="checked" 
              className="!mb-0"
              rules={[
                { required: true, message: 'Please accept the terms and conditions' },
              ]}
            >
              <Checkbox className="text-xs sm:text-sm">
                I agree to the{' '}
                <span 
                  className="text-emerald-600 hover:text-emerald-700 underline cursor-pointer" 
                  onClick={() => {
                    window.open('https://www.atradezone.com/legal', '_blank');
                  }}
                >
                  Terms of Service
                </span>
                {' '}and{' '}
                <span 
                  className="text-emerald-600 hover:text-emerald-700 underline cursor-pointer" 
                  onClick={() => {
                    window.open('https://www.atradezone.com/legal', '_blank');
                  }}
                >
                  Privacy Policy
                </span>
              </Checkbox>
            </Form.Item>
          </div>
        )}

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
            className="w-full h-10 sm:h-12 bg-emerald-600 hover:bg-emerald-700 border-none text-sm sm:text-base font-semibold text-white"
            size="large"
          >
            {type === 'login' && (loading ? 'Signing in...' : 'Sign in')}
            {type === 'register' && (loading ? 'Creating Account...' : 'Create Account')}
            {type === 'reset-password' && (loading ? 'Sending Instructions...' : 'Send Reset Instructions')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;