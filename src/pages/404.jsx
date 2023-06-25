import Head from 'next/head';
import Layout from '@/hocs/Layout';

const SeoList = {
  title: 'Page Not Found - skynet',
  description:
    'Oops! Looks like the page you are trying to visit does not exist. Please check the URL or go back to the homepage.',
  href: '/',
  url: 'https://boomslag.com/404',
  keywords: '404 error, page not found, boomslag',
  robots: 'noindex, nofollow',
  author: 'BoomSlag',
  publisher: 'BoomSlag',
  image:
    'https://bafybeiaor24mrcurzyzccxl7xw46zdqpor4sfuhddl6tzblujoiukchxnq.ipfs.w3s.link/teach.png',
  twitterHandle: '@BoomSlag',
};

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
