import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("funcionario");

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/auth/register",
        { name, username, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Utilizador registado com sucesso!");
      navigate("/users");
    } catch (err) {
      console.log(`error ao registar utilizador ${err}`);
      toast.error("Erro ao registar utilizador.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F0F0]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#8AF3FF]">
          Registar Utilizador
        </h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="funcionario">Funcionário</option>
          <option value="admin">Admin</option>
          <option value="superUser">SuperUser</option>
        </select>
        <button
          type="submit"
          className="w-full bg-[#8AF3FF] text-black font-bold py-2 rounded hover:bg-[#72e4f5]"
        >
          Registar
        </button>
      </form>
    </div>
  );
}
