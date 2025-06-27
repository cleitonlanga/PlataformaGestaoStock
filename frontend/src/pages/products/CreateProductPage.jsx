import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/suppliers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuppliers(data);
      } catch (err) {
        console.log(`Erro ao criar productos ${err}`);
        toast.error("Erro ao carregar fornecedores");
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/products",
        {
          name,
          description,
          price,
          stock,
          supplierId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Produto criado com sucesso");
      navigate("/products");
    } catch (err) {
      console.log(`Erro ao criar producto ${err}`);
      toast.error("Erro ao criar produto");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0F0] flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-[#FFFBFA] p-6 rounded-2xl shadow-xl">
        <div className="relative p-4">
          <BackButton />
        </div>
        <h2 className="text-2xl font-bold text-[#8AF3FF] mb-6 text-center">
          Adicionar Produto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          ></textarea>

          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          />

          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
            className="w-full p-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
          >
            <option value="">Selecione um Fornecedor</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-4 py-2 rounded-xl text-[#8AF3FF] border border-[#8AF3FF] hover:bg-[#8AF3FF]/10 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#8AF3FF] text-white rounded-xl shadow hover:bg-[#6cd3dd] transition"
            >
              Criar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
