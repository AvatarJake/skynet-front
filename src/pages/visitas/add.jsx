import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import ConfirmationModal from './Modal';


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
  const [users, setUsers] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [email, setEmail] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [servicio, setServicio] = useState(null);
  const [fecha_solicitud, setFecha_solicitud] = useState(null);
  const [estado, setEstado] = useState('pendiente');
  const [fecha_atendido, setFecha_atendido] = useState(null);
  const [notas, setNotas] = useState(null);
  const [responsable, setResponsable] = useState(null);
  const [location, setLocation] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      fetch('http://127.0.0.1:8000/auth/users/', {
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

    try {
      fetch("http://127.0.0.1:8001/clientes/clientes/")
        .then((response) => response.json())
        .then((data) => setClientes(data));
        
    } catch (error) {
      console.error('Error al acceder al backend:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
    }

  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find(cliente => cliente.nombres === e.target.value);
    setClienteSeleccionado(selectedCliente);
  };

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
      cliente: (clienteSeleccionado.nombres+' '+clienteSeleccionado.apellidos),
      email: clienteSeleccionado.email,
      direccion: clienteSeleccionado.direccion,
      servicio,
      fecha_solicitud,
      estado,
      fecha_atendido,
      notas,
      responsable,
      location: clienteSeleccionado.location,      
    };
    

    fetch('http://127.0.0.1:8002/visitas/visitas/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    // Aquí puedes manejar la respuesta exitosa del servidor después de enviar los datos
    console.log(data);

    setShowModal(true);
    setMensaje('Visita agregada');
  })
  .catch((error) => {
    // Aquí manejas los errores de validación o errores del servidor (500)
    console.error("Error:", error.message);

    setShowModal(true);
    setMensaje('Error al guardar la visita');
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
        <h1>AGREGAR UNA NUEVA VISITA</h1>
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
        <label htmlFor="clientes"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Cliente:</label>
        <select onChange={handleClienteChange}>
          <option value="">Seleccione un Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.nombres}>
              {cliente.nombres} {cliente.apellidos}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="email"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Email:</label>
        <input
          type="email"
          id="email"
          value={clienteSeleccionado.email}
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
        <label htmlFor="direccion"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={clienteSeleccionado.direccion}
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
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="servicio"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>servicio:</label>
        <input
          type="text"
          id="servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
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
        <label htmlFor="fecha_solicitud"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Solicitud:</label>
        <input
          type="date"
          id="fecha_solicitud"
          value={fecha_solicitud}
          onChange={(e) => setFecha_solicitud(e.target.value)}
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
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="estado" style={{ marginBottom: '0.225rem', fontWeight: 'bold' }}>Estado:</label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{
            padding: '0.25rem',
            borderRadius: '10px',
            border: '2px solid #ccc',
            width: '100%',
            height: '30px',
            margin: '0.225rem',
            boxSizing: 'border-box',
          }}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="operado">Operado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="fecha_atendido"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de atencion:</label>
        <input
          type="date"
          id="fecha_atendido"
          value={fecha_atendido}
          onChange={(e) => setFecha_atendido(e.target.value)}
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
        <label htmlFor="notas"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Notas:</label>
        <input
          type="text"
          id="notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
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
        <label htmlFor="usuarios"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Tecnico Responsable:</label>
        <select onChange={(e) => setResponsable(e.target.value)}>
        <option value="">Seleccione un Tecnico</option>
        {users.map((user) => (
          <option key={user.id} value={user.first_name}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>
      </div>
      <div style={{ marginBottom: '0.75rem'}}>
        <label htmlFor="location"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Location:</label>
        <input
          type="text"
          id="location"
          value={clienteSeleccionado.location}
          
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
             
      </div>
      <div>
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
    <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        message="Guardado exitoso"
      />
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
    
    
      </div>
    </>
  );
  
}


Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

