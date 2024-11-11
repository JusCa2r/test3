'use client';

import { User } from '@/lib/db/schema';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  Activity, 
  Clock, 
  BarChart 
} from 'lucide-react';

interface OverviewProps {
  user: User;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function DashboardOverview({ user }: OverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {user.username || 'User'}
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="1,234"
          icon={<Users className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Active Now"
          value="123"
          icon={<Activity className="h-6 w-6 text-green-500" />}
          description="Active in last 24h"
        />
        <StatCard
          title="Average Time"
          value="2.5h"
          icon={<Clock className="h-6 w-6 text-orange-500" />}
          description="Per session"
        />
        <StatCard
          title="Conversion Rate"
          value="12.3%"
          icon={<BarChart className="h-6 w-6 text-purple-500" />}
          description="Last 30 days"
        />
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add your activity list here */}
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </Card>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          {/* Add quick action buttons */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          {/* Add notifications list */}
        </Card>
      </div>
    </div>
  );
}