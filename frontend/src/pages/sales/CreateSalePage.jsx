import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

export default function CreateSalePage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    date: new Date().toISOString().slice(0, 10),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Produtos das vendas", data);
        setProducts(data || []);
      } catch (err) {
        console.log("Erro ao carregar produtos", err);
        toast.error("Erro ao carregar produtos");
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId || form.quantity <= 0) {
      return toast.warn("Preencha os campos corretamente.");
    }

    try {
      await api.post("/sales", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Venda registrada com sucesso!");
      navigate("/sales/list");
    } catch (err) {
      console.log("Erro ao registar produto", err);
      toast.error("Erro ao registrar venda");
    }
  };
  console.log("produtos: ", products);

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <div className="relative p-4">
        <BackButton />
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Registrar Venda
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Produto
            </label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
            >
              <option value="">Selecione um produto</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min={1}
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data da Venda
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8AF3FF]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8AF3FF] text-white py-2 px-4 rounded-xl hover:bg-cyan-300 transition"
          >
            Registrar Venda
          </button>
        </form>
      </div>
    </div>
  );
}
