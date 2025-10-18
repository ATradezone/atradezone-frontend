'use client';

import AuthLayoutComponent from './components/AuthLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}