import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/context/AuthContext";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Produtos", path: "/products" },
  { label: "Fornecedores", path: "/suppliers" },
  { label: "Vendas", path: "/sales" },
  { label: "Previsão", path: "/forecast" },
  { label: "Utilizadores", path: "/users" },
  { label: "Definições", path: "/settings" },
];

export default function Menu() {
  const { user, logout } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F0F0] relative p-8">
      {/* Top Bar */}
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Bem-vindo,{" "}
          <span
            className="text-[#8AF3FF] cursor-pointer hover:underline"
            onClick={() => navigate("/change-password")}
            title="Alterar senha"
          >
            {user?.username}
          </span>
        </h2>
        <span className="text-sm text-gray-600">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className="bg-[#FFFBFA] cursor-pointer rounded-2xl shadow-md p-6 hover:bg-[#8AF3FF] hover:text-white transition-all duration-300"
            onClick={() => navigate(item.path)}
          >
            <h3 className="text-lg font-bold text-gray-700 hover:text-white">
              {item.label}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Gerir {item.label.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Sair
      </button>
    </div>
  );
}
