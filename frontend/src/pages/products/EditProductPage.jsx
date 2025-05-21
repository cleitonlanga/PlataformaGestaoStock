import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchProductAndSuppliers = async () => {
      try {
        const token = localStorage.getItem("token");

        const [productRes, suppliersRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/suppliers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const product = productRes.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
        setSupplierId(product.supplierId || "");
        setSuppliers(suppliersRes.data);
      } catch (err) {
        console.log(`Erro ao carregar dados: ${err}`);
        toast.error("Erro ao carregar dados");
        navigate("/products");
      }
    };

    fetchProductAndSuppliers();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { name, description, price, stock, supplierId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Produto atualizado com sucesso");
      navigate("/products");
    } catch (err) {
      console.log(`Erro ao actualizar o producto: ${err}`);
      toast.error("Erro ao atualizar produto");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0F0] flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-[#FFFBFA] p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-[#8AF3FF] mb-6 text-center">
          Editar Produto
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
