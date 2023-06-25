import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import { useRouter } from 'next/router';
import ConfirmationModal from './Modal';

export default function DeletePage() {
  const router = useRouter();
  const { id } = router.query;
  const[cliente, setCliente] = useState([]);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (id) {
      console.log('ID:', id);
      fetch(`http://127.0.0.1:8002/visitas/visitas/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCliente(data);
          setNombres(data.cliente);
        });
    }
  }, []);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8002/visitas/visitas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setShowModal(true);
        setMensaje('Usuario eliminado correctamente');
      })
      .catch((error) => {
        setShowModal(true);
        setMensaje('Error al eliminar el usuario...');
      });

    router.push('/visitas/list');
  };

  const handleCancel = () => {
    router.push('/visitas/list');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head></Head>
      <div className="container">
        <div className="content">
          <h1>ELIMINAR CLIENTE</h1>
          <p>
            ¿Estás seguro de que deseas eliminar la visita a {nombres} {apellidos} ?
          </p>
          <div className="button-container">
            <button className="delete-button" onClick={handleDelete}>
              Eliminar
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
          <ConfirmationModal isOpen={showModal} onClose={handleCloseModal} message={mensaje} />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .content {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 4px;
          width: 600px;
        }

        h1 {
          font-size: 20px;
          margin-bottom: 16px;
          text-align: center;
        }

        p {
          margin-bottom: 16px;
        }

        .button-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .delete-button{
        background-color: red;
          color: white;
          padding: 8px 16px;
          margin: 8px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .cancel-button {
          background-color: green;
          color: white;
          padding: 8px 16px;
          margin: 8px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .content {
            width: 90%;
          }
        }
      `}</style>
    </>
  );
}

DeletePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
