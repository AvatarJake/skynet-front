import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = {
  social: [
    
  ],
};

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-white dark:bg-dark-bg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                
                <ul className="mt-6 space-y-4">
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                
                <ul className="mt-6 space-y-4">
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                
                <ul className="mt-6 space-y-4">
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                
                <ul className="mt-6 space-y-4">
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 dark:text-dark-txt text-gray-500 md:order-1 md:mt-0">
            &copy; 2023 Skynet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
