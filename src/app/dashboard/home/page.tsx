'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function DashboardHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect from /dashboard/home to /dashboard/
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}