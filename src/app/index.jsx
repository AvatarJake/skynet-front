import Head from 'next/head';
import Layout from '@/hocs/Layout';
//import Header from './components/Header';
//import Features from './components/Features';
//import Roadmap from './components/Roadmap';

export default function Index() {
  


  return (
    <>
      <Head>
    
      </Head>
      <div className="dark:bg-dark-bg">
        
      </div>
    </>
  );
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};