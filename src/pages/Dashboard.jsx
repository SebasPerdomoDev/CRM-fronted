import React from "react";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaUserTie, FaCalendar } from "react-icons/fa";
import HeaderPage from "../components/HeaderPage";


const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 p-6">
        <HeaderPage />

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estudiantes */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4">
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

          {/* Profesores */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4">
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

          {/* Eventos */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center">
              <FaCalendar className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-green-800 text-lg font-semibold">Ventas</h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
};

export default Dashboard;