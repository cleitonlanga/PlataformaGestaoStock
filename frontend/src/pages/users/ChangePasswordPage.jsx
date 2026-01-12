import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

export default function ChangePasswordPage() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error("As novas passwords não coincidem.");
      return;
    }

    try {
      await api.put(
        `/api/users/reset-password/${user._id}`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password alterada com sucesso!");
      navigate("/"); // Volta ao menu inicial
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao alterar a password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F0F0]">
      <div className="relative p-4">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Alterar Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Password Atual
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nova Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Confirmar Nova Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8AF3FF] text-white font-semibold py-2 rounded-md hover:bg-[#6fdde7] transition duration-200"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
