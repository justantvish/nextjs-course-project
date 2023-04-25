import Head from 'next/head';

import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
            name="description"
            content="Browse a list of active React Meetups"
        />
      </Head>
      <Layout><Component {...pageProps} /></Layout>
    </>
  );
}

export default MyApp;
