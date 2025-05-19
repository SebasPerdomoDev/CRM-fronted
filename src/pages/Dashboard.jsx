import React from "react";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaUserTie, FaCalendar } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Datos de ejemplo para la gráfica
const data = [
  { name: "Ene", ventas: 12 },
  { name: "Feb", ventas: 18 },
  { name: "Mar", ventas: 10 },
  { name: "Abr", ventas: 22 },
  { name: "May", ventas: 15 },
  { name: "Jun", ventas: 19 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <HeaderPage />

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Clientes */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow">
            <div className="w-12 h-12 bg-main-bg-sidebar rounded-full flex items-center justify-center">
              <FaUserGraduate className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-blue-800 text-lg font-semibold">
                Clientes
              </h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          {/* Eventos */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow">
            <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center">
              <FaUserTie className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-orange-700 text-lg font-semibold">
                Eventos
              </h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          {/* Ventas */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow">
            <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center">
              <FaCalendar className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-green-800 text-lg font-semibold">Ventas</h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        {/* Sección de resumen y actividades */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividades recientes */}
          <div className="bg-white rounded-2xl p-6 col-span-2 shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Actividades recientes</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex justify-between">
                <span>Nuevo cliente agregado: <b>Juan Pérez</b></span>
                <span className="text-gray-400 text-sm">Hace 2 horas</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Evento programado: <b>Reunión de ventas</b></span>
                <span className="text-gray-400 text-sm">Hoy, 10:00 AM</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Venta realizada: <b>Paquete Premium</b></span>
                <span className="text-gray-400 text-sm">Ayer</span>
              </li>
            </ul>
          </div>

          {/* Clientes destacados */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Clientes destacados</h3>
            <ul>
              <li className="mb-3">
                <span className="font-semibold">Ana Gómez</span>
                <span className="block text-gray-400 text-sm">ana@email.com</span>
              </li>
              <li className="mb-3">
                <span className="font-semibold">Carlos Ruiz</span>
                <span className="block text-gray-400 text-sm">carlos@email.com</span>
              </li>
              <li>
                <span className="font-semibold">María López</span>
                <span className="block text-gray-400 text-sm">maria@email.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gráfico de ventas */}
        <div className="bg-white rounded-2xl p-6 mt-8 shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumen de ventas</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ventas" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;