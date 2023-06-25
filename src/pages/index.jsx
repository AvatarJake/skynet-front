import Head from 'next/head';
import Layout from '@/hocs/Layout';
//import Header from './components/Header';
//import Features from './components/Features';
//import Roadmap from './components/Roadmap';

export default function Home() {
  return (
    <>
      <Head>
    
      </Head>
      <div className="dark:bg-dark-bg">
        
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
