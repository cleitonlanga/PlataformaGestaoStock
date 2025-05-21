import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F0F0] flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Configurações</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Perfil</h2>
        <p>
          <strong>Nome:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>Nome de utilizador:</strong> {user?.username || "N/A"}
        </p>
        <p>
          <strong>Função:</strong> {user?.role || "N/A"}
        </p>

        <button
          onClick={() => navigate("/change-password")}
          className="mt-6 w-full bg-[#8AF3FF] hover:bg-[#6fdde7] text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Alterar Password
        </button>

        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
