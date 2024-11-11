'use client';

import { useUser } from '@/lib/auth';
import { signOut } from '@/app/auth/actions';
// ... other imports

export function MainHeader() {
  const { user, setUser } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <form action={async () => {
                await signOut();
                setUser(null);
              }}>
                <button 
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <a 
              href="/auth/signin"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}