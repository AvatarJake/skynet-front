import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link';

class PDFGenerator extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('https://msclientesapi.azurewebsites.net/clientes/clientes/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ users: data });
        })
        .catch((error) => {
          console.error('Error al acceder al backend:', error);
        });
    } else {
      console.log('No se encontró el token');
    }
  };

  handleGeneratePDF = () => {
    const pdf = new jsPDF('p', 'pt', 'letter');

    const options = {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    };

    const element = document.getElementById('pdf-content');

    html2canvas(element, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save('clientes_general.pdf');
    });
  };

  render() {
    const { users } = this.state;

    return (
      <>
        <div>
          <style>{`
            .User {
              padding: 20px;
            }
            .table-container {
              overflow-x: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th,
            td {
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
        </div>
        <div>
        <div id="pdf-content" style={{ textAlign: 'center', margin: '20px' }}>
            <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>
              Clientes SKYNET
            </h1>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '5px' }}>
              Clientes Activos
            </p>
            <p></p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>email</th>
                  <th>Telefono</th>
                  <th>Estado</th>
                  <th>Fecha De Union</th>
                </tr>
              </thead>
              <tbody>
              {users
                .filter((user) => user.activo === false)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombres +' '+user.apellidos}</td>
                    <td>{user.email}</td>
                    <td>{user.telefono}</td>
                    <td>{user.activo ? 'Activo' : 'Inactivo'}</td>
                    <td>{user.fecha_union}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={this.handleGeneratePDF} className="button">
            Generar PDF
          </button>
       </div>
      </>
    );
  }
}

export default PDFGenerator;
