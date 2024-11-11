import { desc, eq } from 'drizzle-orm';
import db from '@/lib/db/drizzle';
import { activityLogs, users } from '@/lib/db/schema';
import { getUser } from '@/lib/auth/utils';

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.actionId,
      timestamp: activityLogs.createdAt,
      ipAddress: activityLogs.ipAddress,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.createdAt))
    .limit(10);
} 