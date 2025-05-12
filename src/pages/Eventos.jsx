import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaCalendarAlt } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";

// Datos de ejemplo de eventos
const initialEventos = [
  {
    id: 1,
    fecha: "2025-05-12",
    titulo: "Contactar a Juan Pérez",
    descripcion: "Llamar para seguimiento de propuesta.",
    cliente: "Juan Pérez",
  },
  {
    id: 2,
    fecha: "2025-05-15",
    titulo: "Enviar cotización a Ana Gómez",
    descripcion: "Enviar cotización por correo electrónico.",
    cliente: "Ana Gómez",
  },
  {
    id: 3,
    fecha: "2025-05-18",
    titulo: "Reunión con Carlos Ramírez",
    descripcion: "Reunión presencial en oficina.",
    cliente: "Carlos Ramírez",
  },
];

// Función para formatear la fecha
const formatFecha = (fecha) => {
  const opciones = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
};

const Eventos = () => {
  const [eventos, setEventos] = useState(initialEventos);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    fecha: "",
    titulo: "",
    descripcion: "",
    cliente: "",
  });
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [editEvento, setEditEvento] = useState(null);

  const handleChange = (e) => {
    setNuevoEvento({
      ...nuevoEvento,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrearEvento = (e) => {
    e.preventDefault();
    if (
      !nuevoEvento.fecha ||
      !nuevoEvento.titulo ||
      !nuevoEvento.descripcion ||
      !nuevoEvento.cliente
    )
      return;
    setEventos([
      ...eventos,
      {
        ...nuevoEvento,
        id: eventos.length + 1,
      },
    ]);
    setNuevoEvento({
      fecha: "",
      titulo: "",
      descripcion: "",
      cliente: "",
    });
    setShowModal(false);
  };

  // Modal para ver y editar evento
  const handleEventoClick = (evento) => {
    setSelectedEvento(evento);
    setEditEvento(null);
  };

  const handleEliminarEvento = (id) => {
    setEventos(eventos.filter((ev) => ev.id !== id));
    setSelectedEvento(null);
  };

  const handleEditChange = (e) => {
    setEditEvento({
      ...editEvento,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditarEvento = (e) => {
    e.preventDefault();
    setEventos(
      eventos.map((ev) =>
        ev.id === editEvento.id ? { ...editEvento } : ev
      )
    );
    setSelectedEvento({ ...editEvento });
    setEditEvento(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 p-6">
        <HeaderPage />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Eventos del Calendario</h2>
          <button
            className="bg-main-blue text-white px-4 py-2 rounded font-bold hover:bg-hover-blue transition cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Crear Evento
          </button>
        </div>

        {/* Modal Crear */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Crear Nuevo Evento</h3>
              <form onSubmit={handleCrearEvento} className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={nuevoEvento.fecha}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Título del evento</label>
                  <input
                    type="text"
                    name="titulo"
                    value={nuevoEvento.titulo}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={nuevoEvento.descripcion}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    value={nuevoEvento.cliente}
                    onChange={handleChange}
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

        {/* Modal Detalle/Editar */}
        {selectedEvento && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 text-2xl font-bold cursor-pointer"
                onClick={() => setSelectedEvento(null)}
              >
                &times;
              </button>
              {!editEvento ? (
                <>
                  <h3 className="text-xl font-bold mb-4">Detalle del Evento</h3>
                  <div className="mb-2">
                    <span className="font-bold">Fecha: </span>
                    {formatFecha(selectedEvento.fecha)}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Título: </span>
                    {selectedEvento.titulo}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Descripción: </span>
                    {selectedEvento.descripcion}
                  </div>
                  <div className="mb-4">
                    <span className="font-bold">Cliente: </span>
                    {selectedEvento.cliente}
                  </div>
                  <div className="flex gap-2 ">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition cursor-pointer"
                      onClick={() => setEditEvento(selectedEvento)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition cursor-pointer"
                      onClick={() => handleEliminarEvento(selectedEvento.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">Editar Evento</h3>
                  <form onSubmit={handleEditarEvento} className="space-y-4">
                    <div>
                      <label className="block font-bold mb-1">Fecha</label>
                      <input
                        type="date"
                        name="fecha"
                        value={editEvento.fecha}
                        onChange={handleEditChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Título del evento</label>
                      <input
                        type="text"
                        name="titulo"
                        value={editEvento.titulo}
                        onChange={handleEditChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Descripción</label>
                      <textarea
                        name="descripcion"
                        value={editEvento.descripcion}
                        onChange={handleEditChange}
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Cliente</label>
                      <input
                        type="text"
                        name="cliente"
                        value={editEvento.cliente}
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
                </>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-start cursor-pointer hover:bg-blue-50 transition"
              onClick={() => handleEventoClick(evento)}
            >
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-main-blue mr-2 text-xl" />
                <span className="font-bold text-main-blue">{formatFecha(evento.fecha)}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{evento.titulo}</h3>
              <p className="text-gray-600 mb-2">{evento.descripcion}</p>
              <span className="text-sm text-gray-500">
                Cliente: <span className="font-bold">{evento.cliente}</span>
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Eventos;