import React from "react";

const HeaderPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <main className="flex-1 p-4">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          {/* Título de la página */}
          <h1 className="text-title-table text-2xl ml-[-25px] mr-[35px] sm:ml-[0] sm:mr-[0] sm:text-4xl font-bold text-left">
            CRM
          </h1>

          {/* Perfil del usuario */}
          <div className="flex items-center space-x-4 ml-auto relative bg-white px-4 py-2 shadow-md rounded-2xl">
            <div className="text-sm">
              <h1 className="text-blue-900 font-bold">Juan</h1>
              <p className="text-gray-600 text-sm">CEO</p>
            </div>
            <div className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center bg-blue-900 text-white text-xl font-bold">
              {/* Foto de perfil o inicial */}
              U
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeaderPage;