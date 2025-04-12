import React, { useState } from "react";
import { FaUser, FaArrowLeft, FaPhone, FaUserTie, FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Botón para volver */}
      <button
        className="absolute top-4 left-4 flex items-center bg-main-blue rounded-full text-white font-bold px-4 py-2 hover:bg-hover-blue transition z-20"
        onClick={() => navigate(-1)} // Navega a la página anterior
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </button>

      {/* Contenido centrado */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="relative w-full max-w-sm bg-main-blue text-white rounded-2xl p-6 shadow-md z-10">
          <form>
            <h1 className="text-2xl md:text-3xl text-center font-bold mb-6">Registro</h1>

            {/* Primer Nombre */}
            <div className="relative mb-4">
              <input
                type="text"
                name="primernombre"
                placeholder="Primer Nombre"
                required
                className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 placeholder-gray outline-none focus:border-blue-300"
              />
              <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
            </div>

            {/* Apellidos */}
            <div className="relative mb-4">
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                required
                className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 placeholder-gray outline-none focus:border-blue-300"
              />
              <FaUserTie className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
            </div>

            {/* Teléfono */}
            <div className="relative mb-4">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                required
                className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 placeholder-gray outline-none focus:border-blue-300"
              />
              <FaPhone className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
            </div>

            {/* Correo */}
            <div className="relative mb-4">
              <input
                type="email"
                name="correo"
                placeholder="Correo Electrónico"
                required
                className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 placeholder-gray outline-none focus:border-blue-300"
              />
              <MdEmail size={18} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
            </div>

            {/* Contraseña */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                required
                className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 text-white placeholder-gray outline-none focus:border-blue-300"
              />
              {showPassword ? (
                <FaEyeSlash
                  size={21}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeSharp
                  size={21}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {/* Botón de registro */}
            <button
              type="button"
              className="cursor-pointer w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-300 transition"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;