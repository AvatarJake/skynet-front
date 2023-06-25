import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';
// import Header from './components/Header';
// import Features from './components/Features';
// import Roadmap from './components/Roadmap';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [dpi, setDpi] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [isStaff, setIsStaff] = useState('');
  const [isActive, setIsActive] = useState('');
  const [role, setRole] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario al backend
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repassword:', repassword);
    console.log('Username:', username);
    console.log('firstName:', firstName);
    console.log('lastName:', lastNamesername);
    console.log('fechaNacimiento:', fechaNacimiento);
    console.log('Dpi:', dpi);
    console.log('fechaContratacion:', fechaContratacion);
    console.log('Supervisor:', supervisor);
    console.log('isStaff:', isStaff);
    console.log('isActive:', isActive);
    console.log('Role:', role);
  };

  return (
    <>
      <Head>
      <title>{SeoList.title}</title>
        <meta name="description" content={SeoList.description} />

        <meta name="keywords" content={SeoList.keywords} />
        <link rel="canonical" href={SeoList.href} />
        <meta name="robots" content={SeoList.robots} />
        <meta name="author" content={SeoList.author} />
        <meta name="publisher" content={SeoList.publisher} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Social Media Tags */}
        <meta property="og:title" content={SeoList.title} />
        <meta property="og:description" content={SeoList.description} />
        <meta property="og:url" content={SeoList.url} />
        <meta property="og:image" content={SeoList.image} />
        <meta property="og:image:width" content="1370" />
        <meta property="og:image:height" content="849" />
        <meta property="og:image:alt" content={SeoList.image} />
        <meta property="og:type" content="website" />

        <meta property="fb:app_id" content="555171873348164" />

        <meta name="twitter:title" content={SeoList.title} />
        <meta name="twitter:description" content={SeoList.description} />
        <meta name="twitter:image" content={SeoList.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SeoList.twitterHandle} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        <meta name="twitter:player:stream" content={SeoList.video} />
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
    <label htmlFor="repassword" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Confirm Password:</label>
    <input
      type="password"
      id="repassword"
      value={repassword}
      onChange={(e) => setRepassword(e.target.value)}
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
    <label htmlFor="firstName" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>First Name:</label>
    <input
      type="text"
      id="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
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
    <label htmlFor="lastName" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Last Name:</label>
    <input
      type="text"
      id="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
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
    <label htmlFor="fechaNacimiento" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Nacimiento:</label>
    <input
      type="date"
      id="fechaNacimiento"
      value={fechaNacimiento}
      onChange={(e) => setFechaNacimiento(e.target.value)}
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
    <label htmlFor="fechaContratacion" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Fecha de Contratación:</label>
    <input
      type="date"
      id="fechaContratacion"
      value={fechaContratacion}
      onChange={(e) => setFechaContratacion(e.target.value)}
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
    <label htmlFor="isStaff" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Is Staff:</label>
    <input
      type="checkbox"
      id="isStaff"
      checked={isStaff}
      onChange={(e) => setIsStaff(e.target.checked)}
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
    <label htmlFor="isActive" style={{ marginBottom: '0.225rem', fontWeight: 'bold', width: '70%', height: '30px', margin: '0.225rem' }}>Is Active:</label>
    <input
      type="checkbox"
      id="isActive"
      checked={isActive}
      onChange={(e) => setIsActive(e.target.checked)}
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
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  </div>
  <button type="submit" style={{ padding: '0.25rem',
        borderRadius: '10px',
        border: '2px solid #ccc',
        margin: '0.225rem',
        justifyContent: 'right',
        alignItems: 'center',
        boxSizing: 'border-box', backgroundColor: 'green', color: 'white', border: 'none' }}>Actualizar</button>

</form>


      </div>
    </>
  );
  
}





Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

