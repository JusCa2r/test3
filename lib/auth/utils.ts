import { getSession } from '@/lib/server/session';
import { getUserById } from '@/lib/db/queries';

export async function getUser() {
 
  try {
    const sessionData = await getSession();
    
    if (!sessionData?.user?.id) {
      return null;
    }

    return await getUserById(sessionData.user.id);
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
} 