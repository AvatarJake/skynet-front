import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, Autocomplete, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import { useRouter } from 'next/router';
import ConfirmationModal from './modal';


const mapContainerStyle = {
  width: '100%',
  height: '400px',
  border: '1px solid #ccc',
};

 const center = {
    lat: 14.80081660623604,
    lng: -89.54580370192767
};

export default function VisitasChange() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [users, setUsers] = useState([])
  const [visita, setVisita] = useState([])
  const [clientes, setClientes] = useState([])
  const [cliente, setCliente] = useState([])
  const [email, setEmail] = useState([])
  const [direccion, setDireccion] = useState([])
  const [servicio, setServicio] = useState(null)
  const [fecha_solicitud, setFecha_solicitud] = useState(null)
  const [estado, setEstado] = useState('pendiente')
  const [fecha_atendido, setFecha_atendido] = useState(null)
  const [notas, setNotas] = useState(null)
  const [responsable, setResponsable] = useState([])
  const [location, setLocation] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [clienteSeleccionado, setClienteSeleccionado] = useState({})
  const [map, setMap] = useState(null)
  
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  //variables para calcular la ruta 

  /**@type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  useEffect(() => {
    if (id) {
      console.log('ID:', id);
      fetch(`https://msvisitasapi.azurewebsites.net/visitas/visitas/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setVisita((data));
          setCliente((data.cliente));
          setEmail((data.email));
          setDireccion((data.direccion));
          setServicio((data.servicio));
          setFecha_solicitud((data.fecha_solicitud));
          setEstado((data.estado));
          setFecha_atendido((data.fecha_atendido));
          setNotas((data.notas));
          setResponsable((data.responsable));
          setLocation((data.location))
        });
      }
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('token');
      try {
        fetch('https://msloginapi.azurewebsites.net/auth/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` // encabezado de autorización con el valor del token
          },
        })
          .then((response) => response.json())
          .then((data) => setUsers(data));
      } catch (error) {
        console.error('Error al acceder al backend:', error);
    
      }
  
      try {
        fetch("https://msclientesapi.azurewebsites.net/clientes/clientes/")
          .then((response) => response.json())
          .then((data) => setClientes(data));
          
      } catch (error) {
        console.error('Error al acceder al backend:', error);
         //mostrar un mensaje de error .
      }
  
    }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries:['places'],
  });

  

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  

  async function ruta(){
    if (originRef.current.value === '' || destinationRef.current.value === ''){
      return
    }
    console.log('si se ejecuta')
    const directionsService = new google.maps.DirectionsService()

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    console.log('si se ejecutando la ruta')
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    console.log('la distancia es: ', distance)
  }

  function clear(){
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value=''
    destinationRef.current.value=''
    console.log('se ejecuta la limpieza')
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    // enviar los datos del formulario al backend
    const formData = {
      cliente,
      email,
      direccion,
      servicio,
      fecha_solicitud,
      estado,
      fecha_atendido,
      notas,
      responsable,
      location,
    };
    
    fetch(`http://msvisitasapi.azurewebsites.net/visitas/visitas/${id}/change/`, {
    method: 'PUT',
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
      setMensaje('Visita modificada');
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

  return (<>
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
      <label htmlFor="cliente"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Cliente:</label>
      <input
          type="text"
          id="clientes"
          value={cliente}
          disabled={true}
          onChange={(e) => setCliente(e.target.value)}
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
          disabled={true}

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
          value={direccion}
          disabled={true}
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
        disabled={true}
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
      <input
          type="text"
          id="clientes"
          value={responsable}
          disabled={true}
          onChange={(e) => setResponsable(e.target.value)}
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
      <label htmlFor="location"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Ubicacion del Cliente:</label>
      <input
        type="text"
        id="location"
        value={location}
        ref={destinationRef}
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
    <div style={{ marginBottom: '0.75rem'}}>
      <label htmlFor="punto_partida"style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Punto de Partida:</label>
      <Autocomplete>
      <input
        type="text"
        id="punto_partida"
        ref={originRef}
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
       </Autocomplete>   
    </div>
   
    <div>
 
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
      boxSizing: 'border-box', backgroundColor: 'green', color: 'white', border: 'none' }}>Modificar</button>
      <div>
      </div>
  </form> 
  <div>
    <button type="submit" onClick={ruta} style={{ padding: '0.25rem',
      borderRadius: '10px',
      border: '2px solid #ccc',
      margin: '0.225rem',
      alignItems: 'center',
      boxSizing: 'border-box', backgroundColor: 'green', color: 'white', border: 'none' }}>Calcular Ruta</button>
      
      <button type="submit" onClick={clear} style={{ padding: '0.25rem',
      borderRadius: '10px',
      border: '2px solid #ccc',
      margin: '0.225rem',
      alignItems: 'center',
      boxSizing: 'border-box', backgroundColor: 'green', color: 'white', border: 'none' }}>Limpiar</button>
    </div>
        <text>Distancia: {distance}</text>
        <div></div>
        <text>Tiempo de llegada: {duration}</text>
    </div>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={14.5}
    center={center}
    onLoad={map => setMap(map)}
  >
    <Marker position={center}/>  
    {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
      </GoogleMap>
  </>
);

}

VisitasChange.getLayout = function getLayout(page) {
return <Layout>{page}</Layout>;
};

