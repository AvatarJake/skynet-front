import '@/styles/globals.css';
import '@/styles/LoginForm.css';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';
import ProtectedRoute from './ProtectedRoute';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    const handleRouteChangeError = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
    router.push('/');
  } else {
    // No hay token almacenado, redirigir al usuario a la página de inicio de sesión
    router.push('/login');
  }
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem attribute="class">
        {getLayout(<Component {...props} />)}
        <ToastContainer className="bottom-0" position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
}
