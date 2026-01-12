import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  // Create a map for quick supplier lookup once suppliers are fetched
  const supplierMap = new Map(suppliers.map((s) => [s._id, s.name]));

  const fetchData = async () => {
    try {
      // Assuming you have an Axios interceptor to handle the token.
      // This fetches both products and suppliers at the same time.
      const [productsRes, suppliersRes] = await Promise.all([
        api.get("/products"),
        api.get("/suppliers"),
      ]);
      setProducts(productsRes.data);
      setSuppliers(suppliersRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados da página de produtos:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Sua sessão expirou. Por favor, faça login novamente.");
        navigate("/login");
      } else {
        toast.error("Erro ao carregar os dados.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative p-4">
          <BackButton />
        </div>
        <h1 className="text-2xl font-semibold text-[#8AF3FF]">Produtos</h1>
        <button
          onClick={() => navigate("/products/create")}
          className="flex items-center gap-2 bg-[#8AF3FF] hover:bg-[#6cd3dd] text-white px-4 py-2 rounded-xl shadow-md transition"
        >
          <FaPlus />
          Novo Produto
        </button>
      </div>

      <div className="overflow-x-auto bg-[#FFFBFA] rounded-2xl shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#8AF3FF]/30 text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Fornecedor</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-[#8AF3FF]/10 transition"
                >
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.description || "—"}</td>
                  <td className="px-4 py-3">MZN {product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    {supplierMap.get(product.supplierId) || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/products/${product._id}/edit`)}
                      className="text-[#8AF3FF] hover:text-[#5fc4cc] transition"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
