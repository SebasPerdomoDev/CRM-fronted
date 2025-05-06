import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate
import { MdMenuOpen } from "react-icons/md";
import { FaUserGraduate, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

const menuItems = [
  { path: "/dashboard", icon: <GoHomeFill size={26} />, label: "Inicio" },
  { path: "/clientes", icon: <FaUserGraduate size={26} />, label: "Clientes" },
  { path: "/eventos", icon: <FaUserTie size={26} />, label: "Eventos" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(window.innerWidth > 768); // Comienza abierto en pantallas grandes
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false); // Cierra el Sidebar en pantallas pequeñas
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Limpieza del evento
  }, []);

  return (
    <nav
      className={`shadow-md min-h-screen pl-2 flex flex-col duration-500 bg-main-blue text-white ${
        open ? "w-60" : "w-16 pl-0"
      }`}
    >
      {/* Header */}
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <h1
          className={`text-lg font-bold transition-all duration-500 ${
            open ? "block" : "hidden"
          }`}
        >
          CRM
        </h1>
        <MdMenuOpen
          size={34}
          className={`duration-500 cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Body */}
      <ul className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <li key={index} className="my-2">
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-l-full transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-[#f3f4ff] text-main-blue font-semibold shadow-md pl-6"
                  : "hover:bg-blue-600"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <p className={`${!open && "hidden"} duration-500`}>{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex flex-col gap-2 px-3 py-2 border-t border-gray-400 mt-auto items-center">
        <button
          className={`flex items-center justify-center gap-2 p-3 mt-4 border border-white text-white rounded-full 
          hover:bg-white hover:text-main-blue transition duration-300 
          ${open ? "w-full" : "w-12 h-12"}`}
          onClick={() => navigate("/login")} // Redirige al login
        >
          <FaSignOutAlt size={24} />
          {open && <span className="duration-300">Cerrar Sesión</span>}
        </button>
      </div>
    </nav>
  );
}