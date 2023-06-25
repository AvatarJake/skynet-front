import Head from 'next/head';
import Layout from '@/hocs/Layout';
//import Header from './components/Header';
//import Features from './components/Features';
//import Roadmap from './components/Roadmap';

const SeoList = {
  title: 'SKYNET - Administrador de servicios',
  description:
    'Selecciona la opcion que te corrsponda.',
  href: '/',
  url: 'https://skynet.com',
  keywords:
    '',
  robots: 'all',
  author: 'NelsonBrenes',
  publisher: 'NelsonBrenes ',
  image:'',
  twitterHandle: '@jakebcalderon',
};

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
