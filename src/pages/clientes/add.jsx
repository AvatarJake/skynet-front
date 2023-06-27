import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import ConfirmationModal from './modal';

// import Header from './components/Header';
// import Features from './components/Features';
// import Roadmap from './components/Roadmap';

//Estilos y valores para el mapa
const mapContainerStyle = {
  width: '100%',
  height: '400px',
  border: '1px solid #ccc',
  
};
const center = {
  lat: 14.80081660623604,
  lng: -89.54580370192767
};


export default function Home() {
    
  const [showModal, setShowModal] = useState(false);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [fecha_union, setfecha_union] = useState(null);
  const [activo, setActivo] = useState(true);
  const [notas, setNotas] = useState(null);
  const [location, setLocation] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [markerPosition, setMarkerPosition] = useState(null);

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
      fecha_union,
      activo,
      notas,
      location: markerPosition ? `${markerPosition.lat}, ${markerPosition.lng}` : ''
    };

    console.log('Datos a enviar:', formData);

    fetch('https://msclientesapi.azurewebsites.net/clientes/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta del servidor después de enviar los datos
        console.log(data);
        console.log(`${markerPosition.lat}, ${markerPosition.lng}`)
        setShowModal(true);
        setMensaje('Cliente agregado correctamente');
      })
      .catch((error) => {
        // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
        
        setShowModal(true);
        setMensaje('Error al guardar al cliente');
      });
      
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Head>
    
      </Head>
      <div className="dark:bg-dark-bg">
        <h1>AGREGAR UN NUEVO CLIENTE</h1>
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
        <label htmlFor="fecha_union"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Unión:</label>
        <input
          type="date"
          id="fecha_union"
          value={fecha_union}
          onChange={(e) => setfecha_union(e.target.value)}
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
        boxSizing: 'border-box', backgroundColor: 'blue', color: 'white', border: 'none' }}>Agregar</button>
        <div>
        </div>
    </form>  
    <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        message="Guardado exitoso"
      />
      </div>
    </>
  );
  
}


Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

