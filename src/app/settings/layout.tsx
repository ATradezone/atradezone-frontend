'use client';

import SettingsLayoutComponent from './components/SettingsLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayoutComponent>{children}</SettingsLayoutComponent>;
}