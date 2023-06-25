import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import { useRouter } from 'next/router';
import ConfirmationModal from './Modal';


const mapContainerStyle = {
  width: '100%',
  height: '400px',
  border: '1px solid #ccc',
  
};


export default function ClientesChange() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState([]);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaUnion, setFechaUnion] = useState('');
  const [activo, setActivo] = useState(true);
  const [notas, setNotas] = useState('');
  const [location, setLocation] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [markerPosition, setMarkerPosition] = useState('');

  useEffect(() => {
    if (id) {
      console.log('ID:', id);
      fetch(`http://127.0.0.1:8001/clientes/clientes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCliente((data));
          setNombres(data.nombres);
          setApellidos(data.apellidos);
          setEmail(data.email);
          setTelefono(data.telefono);
          setDireccion(data.direccion);
          setFechaUnion(data.fecha_union);
          setActivo(data.activo);
          setNotas(data.notas);
          setLocation(data.location);

        });
    }
  }, []);


  const handleMapClick = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario al backend
    const formData = {
      nombres,
      apellidos,
      email,
      telefono,
      direccion,
      fechaUnion,
      activo,
      notas,
      location: markerPosition ? `${markerPosition.lat}, ${markerPosition.lng}` : ''
    };
    
    fetch(`http://127.0.0.1:8001/clientes/clientes/${id}/change/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes manejar la respuesta del servidor después de enviar los datos
      console.log(data);
        setShowModal(true);
        setMensaje('Usuario Actualizado correctamente');
    })
    .catch((error) => {
      // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
        setShowModal(true);
        setMensaje('Error al actualizar al usuario, Verifique sus datos');
    });

  };

  const center = {
  lat: 14.80081660623604,
  lng: -89.54580370192767
};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
      
      </Head>
      <body>
      <div className="dark:bg-dark-bg">
        <h1>MODIFICAR AL USUARIO {cliente.nombres} {cliente.apellidos} {id}</h1>
        <form onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: '2rem',
          backgroundColor: '#f7f7f7',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="nombres"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Nombres:</label>
        <input
          type="text"
          id="nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="apellidos"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Apellidos:</label>
        <input
          type="text"
          id="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="email"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="telefono"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Teléfono:</label>
        <input
          type="text"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="direccion"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem'}}>
        <label htmlFor="fechaUnion"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Unión:</label>
        <input
          type="date"
          id="fecha_union"
          value={fechaUnion}
          onChange={(e) => setFechaUnion(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem'}}>
        <label htmlFor="activo"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Activo:</label>
        <input
          type="checkbox"
          id="activo"
          checked={activo}
          onChange={(e) => setActivo(e.target.checked)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="notas"style={{ marginBottom: '0.25rem', fontWeight: 'bold', width: '70%', height: '40px', margin: '0.5rem' }}>Notas:</label>
        <textarea
          id="notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          style={{
            padding: '3rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="location"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Location:</label>
        <input
          type="text"
          id="location"
          value={markerPosition ? `${markerPosition.lat}, ${markerPosition.lng}` : ''}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        />
        <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      onClick={handleMapClick}
    >
      {markerPosition && (
        <Marker position={markerPosition} />
      )}      
    </GoogleMap>  
      </div>
      <button type="submit" style={{ padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        margin: '0.225rem',
        alignItems: 'center',
        boxSizing: 'border-box', backgroundColor: 'green', color: 'white', border: 'none' }}>Modificar</button>
    </form>
    <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        message="Modificacion exitosa"
      />

      </div>
      </body>
    </>
  );
  
}





ClientesChange.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

