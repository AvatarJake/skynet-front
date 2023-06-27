import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
import ConfirmationModal from './Modal';
import moment from 'moment';
// import Header from './components/Header';
// import Features from './components/Features';
// import Roadmap from './components/Roadmap';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRe_password] = useState('');
  const [username, setUsername] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [dpi, setDpi] = useState('');
  const [fecha_contratacion, setFecha_contratacion] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [is_staff, setIs_staff] = useState(false);
  const [is_active, setIs_active] = useState(true);
  const [is_online, setIs_online] = useState(true);
  const [role, setRole] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar la lógica para enviar los datos del formulario al backend
    const formData = {
      email,
      password,
      re_password,
      username,
      first_name,
      last_name,
      fecha_nacimiento,
      dpi,
      fecha_contratacion,
      supervisor,
      is_staff,
      is_active,
      is_online,
      role
    };

    console.log('Datos a enviar:', formData);

    fetch("http://msloginapi.azurewebsites.net/auth/users/", {
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
        setShowModal(true);
        setMensaje('Usuario agregado correctamente');
      })
      .catch((error) => {
        // Aquí puedes manejar los errores en caso de que ocurra alguno durante la solicitud
        setShowModal(true);
        setMensaje('Error al guardar al usuario');
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
        <h1>Agregar un usuario Nuevo</h1>
        <form onSubmit={handleSubmit}  style={{
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
    <label htmlFor="email" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Email:</label>
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
  <div style={{ marginBottom: '0.75rem' }}>
    <label htmlFor="password" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem'}}>Password:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="re_password" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Confirm Password:</label>
    <input
      type="password"
      id="re_password"
      value={re_password}
      onChange={(e) => setRe_password(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="username" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Username:</label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="first_name" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>First Name:</label>
    <input
      type="text"
      id="first_name"
      value={first_name}
      onChange={(e) => setFirst_name(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="last_name" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Last Name:</label>
    <input
      type="text"
      id="last_name"
      value={last_name}
      onChange={(e) => setLast_name(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="fecha_nacimiento" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Nacimiento:</label>
    <input
      type="date" pattern="\d{4}-\d{2}-\d{2}" required
      id="fecha_nacimiento"
      value={fecha_nacimiento}
      onChange={(e) => setFecha_nacimiento(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="dpi" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>DPI:</label>
    <input
      type="text"
      id="dpi"
      value={dpi}
      onChange={(e) => setDpi(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="fecha_contratacion" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Contratación:</label>
    <input
      type="date"
      id="fecha_contratacion"
      value={fecha_contratacion}
      onChange={(e) => setFecha_contratacion(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="supervisor" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Supervisor:</label>
    <input
      type="text"
      id="supervisor"
      value={supervisor}
      onChange={(e) => setSupervisor(e.target.value)}
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
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="is_staff" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Is Staff:</label>
    <input
      type="checkbox"
      id="is_staff"
      checked={is_staff}
      onChange={(e) => setIs_staff(e.target.checked)}
      style={{
        padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        
        
        margin: '0.225rem',
        boxSizing: 'border-box',
      }}
    />
  </div>
  <div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="is_active" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Is Active:</label>
    <input
      type="checkbox"
      id="is_active"
      checked={is_active}
      onChange={(e) => setIs_active(e.target.checked)}
      style={{
        padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        margin: '0.225rem',
        boxSizing: 'border-box',
       
      }}
    />
  </div><div style={{ marginBottom: '0.5rem' }}>
    <label htmlFor="is_online" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Is Online:</label>
    <input
      type="checkbox"
      id="is_online"
      checked={is_online}
      onChange={(e) => setIs_online(e.target.checked)}
      style={{
        padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        margin: '0.225rem',
        boxSizing: 'border-box',
       
      }}
    />
  </div>
  <div style={{ marginBottom: '1.5rem' }}>
    <label htmlFor="role" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Role:</label>
    <select
      id="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
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
      <option value="">Select Role</option>
      <option value="supervisor">Supervisor</option>
      <option value="tecnico">Tecnico</option>
      <option value="administrador">Administrador</option>
    </select>
  </div>
  <button type="submit" style={{ padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        margin: '0.225rem',
        justifyContent: 'right',
        alignItems: 'center',
        boxSizing: 'border-box', backgroundColor: 'blue', color: 'white', border: 'none' }}>Agregar</button>

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

