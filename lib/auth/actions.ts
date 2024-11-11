'use server';

import { validatedAction, validatedActionWithUser } from '@/lib/server/middleware';
import { comparePasswords, hashPassword, setSession } from '@/lib/server/session';
import db from '@/lib/db/drizzle';
import { getUser } from '@/lib/auth/utils';
import {
  activityLogs,
  User,
  users,
  type NewActivityLog,
  type NewUser
} from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

async function logActivity(
  userId: number,
  actionId: number,
  ipAddress?: string
) {
  const newActivity: NewActivityLog = {
    userId,
    actionId: actionId,
    ipAddress: ipAddress || '',
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const user = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return { error: 'Invalid email or password. Please try again.' };
  }

  const { user: foundUser } = user[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.passwordHash
  );

  if (!isPasswordValid) {
    return { error: 'Invalid email or password. Please try again.' };
  }

  await Promise.all([
    setSession(foundUser),
    logActivity(foundUser.id, 1),
  ]);

  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string(),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, username } = data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: 'Failed to create user. Please try again.' };
  }

  const passwordHash = await hashPassword(password);

  const newUser: NewUser = {
    email,
    passwordHash,
    username: username,
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return { error: 'Failed to create user. Please try again.' };
  }

  await Promise.all([
    logActivity(createdUser.id, 1),
    setSession(createdUser),
  ]);

  redirect('/dashboard');
});

export async function signOut() {
  const user = (await getUser()) as User;
  await logActivity(user.id, 1);
  (await cookies()).delete('session');
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user_active) => {
    const { currentPassword, newPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user_active.passwordHash
    );

    if (!isPasswordValid) {
      return { error: 'Current password is incorrect.' };
    }

    if (currentPassword === newPassword) {
      return {
        error: 'New password must be different from the current password.',
      };
    }

    const newPasswordHash = await hashPassword(newPassword);
    const user = await getUser();
    if (!user) {
      return { error: 'User not found.' };
    }

    await Promise.all([
      db
        .update(users)
        .set({ passwordHash: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(user.id, 4),
    ]);

    return { success: 'Password updated successfully.' };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user_active) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user_active.passwordHash);
    if (!isPasswordValid) {
      return { error: 'Incorrect password. Account deletion failed.' };
    }

    const user = await getUser();

    if (!user) {
      return { error: 'User not found.' };
    }

    await logActivity(
      user.id,
      3
    );

    // Soft delete
    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
      })
      .where(eq(users.id, user.id));

    (await cookies()).delete('session');
    redirect('/sign-in');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user_active) => {
    const { name, email } = data;
    const user = await getUser();

    if (!user) {
      return { error: 'User not found.' };
    }

    await Promise.all([
      db.update(users).set({ username: name, email }).where(eq(users.id, user.id)),
      logActivity(user.id, 2),
    ]);

    return { success: 'Account updated successfully.' };
  }
);
