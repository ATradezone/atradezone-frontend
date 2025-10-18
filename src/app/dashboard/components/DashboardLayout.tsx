'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If someone lands on /dashboard/home, redirect them to /dashboard
    if (pathname === '/dashboard/home') {
      router.replace('/dashboard');
    }
  }, [pathname, router]);

  return (
    <div className="w-full">
      {children}
    </div>
  );
}