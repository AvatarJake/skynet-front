import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import Link from 'next/link';

const SeoList = {
  title: 'SKYNET - Administrador de servicios',
  description: 'Selecciona la opción que te corresponda.',
  href: '/',
  url: 'https://skynet.com',
  keywords: '',
  robots: 'all',
  author: 'NelsonBrenes',
  publisher: 'NelsonBrenes',
  image: '',
  twitterHandle: '@jakebcalderon',
};


export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8001/clientes/clientes/")
        .then((response) => response.json())
        .then((data) => setClientes(data));
    } catch (error) {
      console.error('Error al acceder al backend:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
 
        <style>{`
          .Clientes {
            padding: 20px;
          }
          .table-container {
            overflow-x: auto;
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
      <h1>Listado de Clientes</h1>
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
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombres}</td>
                <td>{cliente.apellidos}</td>
                <td>
                  <Link href={`/clientes/change?id=${cliente.id}`} passHref>
                    Modificar
                  </Link>
                  <td></td>
                  <Link href={`/clientes/delete?id=${cliente.id}`} passHref>
                    Eliminar
                  </Link>
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
