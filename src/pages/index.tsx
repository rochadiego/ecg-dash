import React from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

export default function Index() {
  const [session, loading] = useSession();

  const router = useRouter();

  if (!loading && !session) signIn('auth0');
  else if (!loading && session) router.push('dashboard');

  return <div />;
}
