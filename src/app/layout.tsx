import React from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import MainLayout from '../components/shared/MainLayout';
import { siteConfig } from '../config/site';
import AntdClientProvider from '../components/layout/AntdClientProvider';
import { Afacad } from 'next/font/google';

const afacad = Afacad({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
});

export const metadata = {
  title: `${siteConfig.name} - Sign In`,
  description: 'Sign in to access your enterprise management dashboard',
  icons: {
    icon: '/images/web-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={afacad.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AntdClientProvider>
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AuthProvider>
        </AntdClientProvider>
      </body>
    </html>
  )
}