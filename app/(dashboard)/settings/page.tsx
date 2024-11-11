'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ActionState = {
  error?: string;
  success?: string;
};

export function Settings() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add personal settings like:
              - Profile information
              - Preferences
              - Account management
              - etc. */}
        </CardContent>
      </Card>
    </section>
  );
}
