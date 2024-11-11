'use client';

import { MainHeader } from '@/components/dashboard/MainHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// Move to config/navigation.ts
import { Users, Settings, Shield, Activity } from 'lucide-react';
export const navItems = [
  { href: '/dashboard', icon: Users, label: 'Users information' },
  { href: '/dashboard/general', icon: Settings, label: 'General' },
  { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  { href: '/dashboard/security', icon: Shield, label: 'Security' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex flex-col min-h-screen">
      {/* Main Header */}
      <MainHeader />

      {/* Dashboard Container */}
      <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white border-b p-4">
          <span className="font-medium">Settings</span>
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <DashboardSidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            navItems={navItems}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-0 lg:p-4">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
