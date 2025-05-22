import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/suppliers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers(res.data);
    } catch (err) {
      console.log("Erro ao carregar fornecedores", err);
      toast.error("Erro ao buscar fornecedores");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este fornecedor?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Fornecedor removido com sucesso");
      fetchSuppliers();
    } catch (err) {
      console.log("Erro ao remover fornecedor", err);
      toast.error("Erro ao remover fornecedor");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <div className="relative p-4">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto bg-[#FFFBFA] rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#8AF3FF]">Fornecedores</h2>
          <button
            onClick={() => navigate("/suppliers/create")}
            className="bg-[#8AF3FF] text-white px-4 py-2 rounded-xl hover:bg-[#6cd3dd] transition"
          >
            Adicionar Fornecedor
          </button>
        </div>

        {suppliers.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum fornecedor encontrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-xl">
              <thead className="bg-[#8AF3FF]/20">
                <tr>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Contacto</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Endereço</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <tr key={s._id} className="border-t">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.contact}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.address}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/suppliers/${s._id}/edit`)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
