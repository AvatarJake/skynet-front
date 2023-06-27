import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Verificar si no hay un token válido
    if (!token) {
      // Redirigir al usuario a la página de inicio de sesión
      router.push('/');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
