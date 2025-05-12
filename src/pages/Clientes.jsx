import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaCalendar, FaEllipsisV } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";

const initialClientes = [
  {
    id: 1,
    nit: "123456789",
    nombre: "Juan Pérez",
    direccion: "Calle 123 #45-67",
    ciudad: "Bogotá",
    telefono: "3001234567",
    email: "juanperez@email.com",
  },
  {
    id: 2,
    nit: "987654321",
    nombre: "Ana Gómez",
    direccion: "Carrera 10 #20-30",
    ciudad: "Medellín",
    telefono: "3109876543",
    email: "anagomez@email.com",
  },
  {
    id: 3,
    nit: "654321987",
    nombre: "Carlos Ramírez",
    direccion: "Av. Siempre Viva 742",
    ciudad: "Cali",
    telefono: "3124567890",
    email: "carlos.ramirez@mail.com",
  },
  {
    id: 4,
    nit: "321654987",
    nombre: "María Torres",
    direccion: "Cra 15 #34-56",
    ciudad: "Barranquilla",
    telefono: "3159876543",
    email: "maria.torres@mail.com",
  },
  // Puedes agregar más clientes aquí
];

const Clientes = () => {
  const [clientes, setClientes] = useState(initialClientes);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editCliente, setEditCliente] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEliminar = (id) => {
    setClientes(clientes.filter((c) => c.id !== id));
    setOpenMenuId(null);
  };

  const handleEditChange = (e) => {
    setEditCliente({
      ...editCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    setClientes(
      clientes.map((c) =>
        c.id === editCliente.id ? { ...editCliente } : c
      )
    );
    setEditCliente(null);
    setOpenMenuId(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 p-6">
        <HeaderPage />

        {/* Tabla de Clientes */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Clientes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-main-blue text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Nit</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Nombre completo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Dirección</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Ciudad</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Teléfono</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="px-4 py-2">{cliente.id}</td>
                    <td className="px-4 py-2">{cliente.nit}</td>
                    <td className="px-4 py-2">{cliente.nombre}</td>
                    <td className="px-4 py-2">{cliente.direccion}</td>
                    <td className="px-4 py-2">{cliente.ciudad}</td>
                    <td className="px-4 py-2">{cliente.telefono}</td>
                    <td className="px-4 py-2">{cliente.email}</td>
                    <td className="px-4 py-2 relative">
                      <div className="inline-block">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200"
                          onClick={() => handleMenuToggle(cliente.id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {openMenuId === cliente.id && (
                          <div className="absolute left-0 mt-2 w-40 bg-white shadow z-10 rounded">
                            <button
                              className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                              onClick={() => {
                                setEditCliente(cliente);
                                setOpenMenuId(null);
                              }}
                            >
                              Actualizar
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                              onClick={() => handleEliminar(cliente.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Actualización */}
        {editCliente && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
                onClick={() => setEditCliente(null)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Actualizar Cliente</h3>
              <form onSubmit={handleActualizar} className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">Nit</label>
                  <input
                    type="text"
                    name="nit"
                    value={editCliente.nit}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={editCliente.nombre}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={editCliente.direccion}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={editCliente.ciudad}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={editCliente.telefono}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editCliente.email}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-main-blue text-white px-4 py-2 rounded font-bold hover:bg-hover-blue transition w-full cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Clientes;