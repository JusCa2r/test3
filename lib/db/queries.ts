import { desc, and, eq, isNull } from 'drizzle-orm';
import db from './drizzle';
import { activityLogs, users } from './schema';

export async function getUserById(userId: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(
      eq(users.id, userId),
      isNull(users.deletedAt)
    ))
    .limit(1);
  
  return user ?? null;
}

export async function getActivityLogs(userId: number) {
  const user = await getUserById(userId);
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