import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login.jsx';
import Register from '../src/pages/Register.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import Clientes from  '../src/pages/Clientes.jsx'
import Eventos from '../src/pages/Eventos.jsx';
import Empleados from '../src/pages/Empleados.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/empleados" element={<Empleados />} />
      {/* Puedes agregar más rutas aquí */}
      
      
    </Routes>
  );
}

export default App;
