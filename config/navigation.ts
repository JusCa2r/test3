import { Users, Settings, Shield, Activity } from 'lucide-react';

export const dashboardNavItems = [
  { href: '/dashboard', icon: Users, label: 'Users information' },
  { href: '/dashboard/general', icon: Settings, label: 'General' },
  { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  { href: '/dashboard/security', icon: Shield, label: 'Security' },
]; 