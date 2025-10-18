'use client';

import DashboardLayoutComponent from './components/DashboardLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}