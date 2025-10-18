'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
// Add the compatibility patch for React 19
import '@ant-design/v5-patch-for-react-19';

const AntdClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4ade80',
            colorInfo: '#4ade80',
            colorSuccess: '#4ade80',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            colorText: '#1e293b',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
          components: {
            Button: {
              primaryColor: '#1e293b',
              defaultBg: '#4ade80',
              defaultColor: '#1e293b',
              defaultHoverBg: '#6ee7b7',
              defaultHoverColor: '#1e293b',
            },
            Input: {
              activeBorderColor: '#4ade80',
              hoverBorderColor: '#4ade80',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdClientProvider;