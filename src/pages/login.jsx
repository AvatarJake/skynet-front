import React, { useState } from 'react';
import { useRouter } from 'next/router';


const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos de usuario y contraseña no estén vacíos
    if (!username || !password) {
      setError('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }

    // Realizar la solicitud de inicio de sesión al backend
    try {
      const response = await fetch('https://msloginapi.azurewebsites.net/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        // Inicio de sesión exitoso, realizar acciones necesarias (redireccionar, almacenar token, etc.)
        const data = await response.json();
        const token = data.token;
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('token', token);
        router.push('/');
        console.log('Token:', token);
        // Realiza las acciones necesarias con el token (por ejemplo, almacenarlo en el estado o en el almacenamiento local)
        setToken(token);

        //aqui obtenemos los datos del usuario logeado para realizar validaciones
    const responseUser = await fetch('https://msloginapi.azurewebsites.net/auth/users/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    
    if (responseUser.ok) {
      // Obtener los datos del usuario
      const userData = await responseUser.json();
    
      // Acceder al nombre del usuario desde los datos recibidos
      const firstName = userData.first_name;
      
      const lastName = userData.last_name;
      const role = userData.role;
      localStorage.setItem('user', firstName)
      localStorage.setItem('role', role)
      console.log('Nombre de usuario:', firstName, lastName);
      console.log('Tipo de Usuario:', role);

      //se almacenan los datos del usuario actual en las variables locales
      
    } else {
      // Error al obtener los datos del usuario, manejar el error de acuerdo a tus necesidades
      console.log('Error al obtener los datos del usuario');
    }

      } else {
        // Error en el inicio de sesión, manejar el error de acuerdo a tus necesidades
        setError('Credenciales ingresadas no validas.');
        return;
        console.log('Error en el inicio de sesión');
      }
    } catch (error) {
      // Error en la comunicación con el servidor, manejar el error de acuerdo a tus necesidades
      console.log('Error de conexión');
    }
    


};

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <div className="form-group">
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
