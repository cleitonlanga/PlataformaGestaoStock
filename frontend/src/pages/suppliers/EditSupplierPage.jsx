import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function EditSupplierPage() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
    } catch (err) {
      console.log("Erro ao carregar fornecedores", err);
      toast.error("Erro ao carregar fornecedor");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/suppliers/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Fornecedor atualizado com sucesso!");
      navigate("/suppliers");
    } catch (err) {
      console.log("Erro ao atualizar fornecedor", err);
      toast.error("Erro ao atualizar fornecedor");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6 flex items-center justify-center">
      <div className="relative p-4">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFBFA] shadow-xl p-8 rounded-2xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-[#8AF3FF] mb-6">
          Editar Fornecedor
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-xl"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contacto"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-xl"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-xl"
        />
        <input
          type="address"
          name="address"
          placeholder="Endereço"
          value={form.address}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-[#8AF3FF] hover:bg-[#6cd3dd] text-white p-3 rounded-xl"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
