'use server';

import { authServer } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export async function signOut() {
  const { error } = await authServer.signOut();

  if (error) {
    console.error('Sign out error:', error.message);
    return { error: error.message || 'Failed to sign out. Try again' };
  }

  redirect('/auth/sign-in');
}