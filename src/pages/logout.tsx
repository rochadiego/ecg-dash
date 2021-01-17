import React from 'react';
import Layout from 'Layouts';
import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import styled from 'styled-components';
import { useSession, signOut, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;

const logout = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && !session) signIn('auth0');

  return (
    <Layout title="sair">
      <Card>
        <CardBody>
          <ErrorStyle>
            <h1>Sair?</h1>
            <small>Tem certeza que deseja sair?</small>
            <Row>
              <Col breakPoint={{ xs: true }}>
                <Button fullWidth appearance="hero" onClick={(): Promise<void> => signOut()}>
                  Sim
                </Button>
              </Col>
              <Col breakPoint={{ xs: true }}>
                <Button fullWidth appearance="hero" onClick={() => router.push('/')}>
                  Não
                </Button>
              </Col>
            </Row>
          </ErrorStyle>
        </CardBody>
      </Card>
    </Layout>
  );
};
export default logout;
