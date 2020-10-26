import Head from 'next/head';
import styled from 'styled-components';

import { Sidebar } from '../src/Sidebar';
import { Timeline } from '../src/Timeline';
import { Widgets } from '../src/Widgets';
import { Rows } from '../src/style';

const Container = styled(Rows)`
  max-width: 1300px;
  margin: 0 auto;
  height: 100vh;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Twytter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Sidebar />
        <Timeline />
        <Widgets />
      </Container>
    </>
  );
}
