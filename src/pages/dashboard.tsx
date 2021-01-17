import React from 'react';
import Layout from 'Layouts';
import { useSession, signIn } from 'next-auth/client';
import Marker from '../components/Marker/Marker';

const dashboard = () => {
  const [session, loading] = useSession();

  if (!loading && !session) signIn('auth0');

  return (
    <Layout title="dashboard">
      <Marker />
    </Layout>
  );
};
export default dashboard;
