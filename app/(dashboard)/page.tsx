import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/utils';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardOverview user={user} />
    </div>
  );
}
