import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV, FaUserTie } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";

const initialEmpleados = [
  {
    id: 1,
    cc: "1001234567",
    nombre: "Laura Martínez",
    ciudad: "Bogotá",
    telefono: "3001112233",
    email: "laura.martinez@email.com",
  },
  {
    id: 2,
    cc: "1009876543",
    nombre: "Pedro Gómez",
    ciudad: "Medellín",
    telefono: "3102223344",
    email: "pedro.gomez@email.com",
  },
  {
    id: 3,
    cc: "1005556667",
    nombre: "Sofía Torres",
    ciudad: "Cali",
    telefono: "3123334455",
    email: "sofia.torres@email.com",
  },
  {
    id: 4,
    cc: "1008889990",
    nombre: "Carlos Ruiz",
    ciudad: "Barranquilla",
    telefono: "3154445566",
    email: "carlos.ruiz@email.com",
  },
  // Puedes agregar más empleados aquí
];

const Empleados = () => {
  const [empleados, setEmpleados] = useState(initialEmpleados);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editEmpleado, setEditEmpleado] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEliminar = (id) => {
    setEmpleados(empleados.filter((e) => e.id !== id));
    setOpenMenuId(null);
  };

  const handleEditChange = (e) => {
    setEditEmpleado({
      ...editEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    setEmpleados(
      empleados.map((e) =>
        e.id === editEmpleado.id ? { ...editEmpleado } : e
      )
    );
    setEditEmpleado(null);
    setOpenMenuId(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 p-6">
        <HeaderPage />

        {/* Tabla de Empleados */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Empleados</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-main-blue text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">C.C</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Nombre completo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Ciudad</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Teléfono</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Correo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td className="px-4 py-2">{empleado.id}</td>
                    <td className="px-4 py-2">{empleado.cc}</td>
                    <td className="px-4 py-2">{empleado.nombre}</td>
                    <td className="px-4 py-2">{empleado.ciudad}</td>
                    <td className="px-4 py-2">{empleado.telefono}</td>
                    <td className="px-4 py-2">{empleado.email}</td>
                    <td className="px-4 py-2 relative">
                      <div className="inline-block">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200"
                          onClick={() => handleMenuToggle(empleado.id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {openMenuId === empleado.id && (
                          <div className="absolute left-0 mt-2 w-40 bg-white shadow z-10 rounded font-bold">
                            <button
                              className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                              onClick={() => {
                                setEditEmpleado(empleado);
                                setOpenMenuId(null);
                              }}
                            >
                              Actualizar
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                              onClick={() => handleEliminar(empleado.id)}
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
        {editEmpleado && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
                onClick={() => setEditEmpleado(null)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Actualizar Empleado</h3>
              <form onSubmit={handleActualizar} className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">C.C</label>
                  <input
                    type="text"
                    name="cc"
                    value={editEmpleado.cc}
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
                    value={editEmpleado.nombre}
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
                    value={editEmpleado.ciudad}
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
                    value={editEmpleado.telefono}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={editEmpleado.email}
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

export default Empleados;