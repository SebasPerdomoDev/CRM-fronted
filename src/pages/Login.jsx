import React, { useState } from "react";
import { FaUser, FaFacebook, FaEyeSlash, FaInstagram } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4">
      {/* Imagen de fondo con opacidad */}
      
      {/* Overlay oscuro con opacidad */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative w-full max-w-md bg-main-fet text-white rounded-2xl p-8 shadow-md">
        <form>
          
          <h1 className="text-3xl text-center font-bold mb-6">Bienvenido</h1>

          {/* Correo */}
          <div className="relative mb-6">
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              required
              className="w-full bg-transparent border border-white/40 rounded-full px-4 py-3 placeholder-gray outline-none focus:border-blue-300"
            />
            <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" />
          </div>

          {/* Contraseña */}
          <div className="relative mb-6">
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

          {/* Olvidó su contraseña */}
          <div className="text-right mb-4">
            <a className="hover:underline cursor-pointer">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="button"
            className="cursor-pointer w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-300 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;