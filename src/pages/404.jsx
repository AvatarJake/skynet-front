import Head from 'next/head';
import Layout from '@/hocs/Layout';



export default function NotFound() {
  return (
    <div className="dark:bg-dark-bg">
      <Head>
    
      </Head>
      <p className="dark:text-dark-txt">NOT FOUND</p>
    </div>
  );
}

NotFound.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
