import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

    if (token) {
      // Realiza las acciones necesarias con el token
      console.log('Token:', token);
    } else {
      // El token no está almacenado en el localStorage
      console.log('No se encontró el token');
    }

  useEffect(() => {
    try {
      fetch('http://msloginapi.azurewebsites.net/auth/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}` // Incluye el encabezado de autorización con el valor del token
        },
      })
        .then((response) => response.json())
        .then((data) => setUsers(data));
    } catch (error) {
      console.error('Error al acceder al backend:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
 
        <style>{`
          .User {
            padding: 20px;
          }
          .table-container {
            overflow-x: auto;
            text-align: center
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
          .search-input {
            margin-bottom: 10px;
          }
        `}</style>
      </Head>
      <h1>Listado de Empleados</h1>
      <div className="table-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>No hay acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name + ' ' +user.last_name}</td>
                <td>{user.role}</td>
                <td>{user.is_active ? 'Activo' : 'Inactivo'}</td>
                <td>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
