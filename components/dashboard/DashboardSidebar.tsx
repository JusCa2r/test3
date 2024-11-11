'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  icon: any;
  label: string;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function DashboardSidebar({ isOpen, onClose, navItems }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`w-64 bg-white lg:bg-gray-50 border-r border-gray-200 
      lg:block ${isOpen ? 'block' : 'hidden'} 
      lg:relative absolute inset-y-0 left-0 z-40`}
    >
      <nav className="h-full overflow-y-auto p-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={`my-1 w-full justify-start ${
                pathname === item.href ? 'bg-gray-100' : ''
              }`}
              onClick={onClose}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 