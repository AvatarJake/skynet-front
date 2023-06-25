import React from 'react';
import Head from 'next/head';
import Layout from '@/hocs/Layout';

export default function Reportes() {

      
      return (
        <div className="reportes">
            <div>
                Reporte de usuarios
            </div>
            <div class="barra-superior">
                <a href="/reportes/usuarios_general/" class="boton_reporte">Listado General de Usuarios</a>
                <a href="/reportes/listado_tecnicos/" class="boton_reporte">Listado de tecnicos</a>
            <div>
                <td></td>

            </div>
            <div></div>
            </div>
            <div>
                Reporte de Clientes
            </div>
            <div class="barra-superior">
                <a href="/reportes/clientes_general/" class="boton_reporte">Listado general de clientes</a>
                <a href="/reportes/clientes_activos/" class="boton_reporte">Clientes activos</a>
                <a href="/reportes/clientes_inactivos/" class="boton_reporte">Clientes inactivos</a>
                
            </div>
            <div></div>
            <div></div>
            <div>
                Reporte de visitas
            </div>
            <div class="barra-superior">
                <a href="/reportes/visitas_general/" class="boton_reporte">Visitas general</a>
                <a href="http://127.0.0.1:8001/admin/" class="boton_reporte">Listado de Visitas por fecha</a>
                <a href="http://127.0.0.1:8001/admin/" class="boton_reporte">Listado de Visitas por Usuario</a>
                
            </div>   
        </div>
      );

}
Reportes.getLayout = function getLayout(page) {
        return <Layout>{page}</Layout>;
};
