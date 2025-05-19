import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";
import axios from "axios";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editEmpleado, setEditEmpleado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    cc: "",
    nombre: "",
    ciudad: "",
    telefono: "",
    email: "",
  });

  // Cargar empleados desde la base de datos al iniciar
  useEffect(() => {
    axios
      .get("http://localhost:3000/empleados")
      .then((res) => setEmpleados(res.data))
      .catch((err) => console.error("Error al cargar empleados:", err));
  }, []);

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

  const handleNuevoChange = (e) => {
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrearEmpleado = async (e) => {
    e.preventDefault();
    if (
      !nuevoEmpleado.cc ||
      !nuevoEmpleado.nombre ||
      !nuevoEmpleado.ciudad ||
      !nuevoEmpleado.telefono ||
      !nuevoEmpleado.email
    )
      return;

    try {
      const res = await axios.post("http://localhost:3000/empleados", nuevoEmpleado);
      setEmpleados([...empleados, res.data]);
      setNuevoEmpleado({
        cc: "",
        nombre: "",
        ciudad: "",
        telefono: "",
        email: "",
      });
      setShowModal(false);
    } catch (err) {
      console.error("Error al crear el empleado:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <HeaderPage />

        {/* Tabla de Empleados */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Lista de Empleados</h2>
            <button
              className="bg-main-blue text-white px-4 py-2 rounded font-bold hover:bg-hover-blue transition"
              onClick={() => setShowModal(true)}
              type="button"
            >
              Crear Empleado
            </button>
          </div>
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
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase"></th>
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

        {/* Modal Crear Empleado */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold ">Crear Nuevo Empleado</h3>
              <form onSubmit={handleCrearEmpleado} className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">C.C</label>
                  <input
                    type="text"
                    name="cc"
                    value={nuevoEmpleado.cc}
                    onChange={handleNuevoChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoEmpleado.nombre}
                    onChange={handleNuevoChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={nuevoEmpleado.ciudad}
                    onChange={handleNuevoChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={nuevoEmpleado.telefono}
                    onChange={handleNuevoChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={nuevoEmpleado.email}
                    onChange={handleNuevoChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-main-blue text-white px-4 py-2 rounded font-bold hover:bg-hover-blue transition w-full cursor-pointer"
                >
                  Crear
                </button>
              </form>
            </div>
          </div>
        )}

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
