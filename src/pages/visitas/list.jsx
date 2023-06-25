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
  const [visitas, setVisitas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const firstName = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    console.log('nombresito:' , firstName)
    console.log('que hace:' , role)
    setRole(role)
    setFirstName(firstName)
    
  })

  useEffect(() => {
    try {
      fetch("http://127.0.0.1:8002/visitas/visitas/")
        .then((response) => response.json())
        .then((data) => setVisitas(data));
    } catch (error) {
      console.error('Error al acceder al backend:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVisitas = visitas.filter((visita) =>
    visita.cliente.toLowerCase().includes(searchTerm.toLowerCase())||
    visita.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
 
        <style>{`
          .Visita {
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
      <h1>Listado de Visitas</h1>
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
              <th>Fecha de Solicitud</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitas.map((visita) => (
              <tr key={visita.id}>
                <td>{visita.cliente}</td>
                <td>{visita.fecha_solicitud}</td>
                <td>{visita.estado}</td>
                <td>
                  <Link href={`/visitas/change?id=${visita.id}`} passHref>
                    Modificar
                  </Link>
                  <td></td>
                  <Link href={`/visitas/delete?id=${visita.id}`} passHref>
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
