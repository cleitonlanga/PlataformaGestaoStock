import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.user, res.data.token);
      toast.success("Login bem-sucedido!");
      navigate("/"); // Vai para menu inicial
    } catch (err) {
      console.log(`error no login ${err}`);
      toast.error("Credenciais inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F0F0]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#8AF3FF]">
          Login
        </h2>
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
        <button
          type="submit"
          className="w-full bg-[#8AF3FF] text-black font-bold py-2 rounded hover:bg-[#72e4f5]"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
