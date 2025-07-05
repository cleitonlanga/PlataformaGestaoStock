import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function ListSalesPage() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchProduct, setSearchProduct] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      // Assuming you have an Axios interceptor to handle the token.
      const { data } = await api.get("/sales");
      setSales(data);
      setFilteredSales(data);
    } catch (error) {
      console.error("Erro ao carregar vendas: ", error);
      if (error.response && error.response.status === 401) {
        toast.error("Sua sessão expirou. Por favor, faça login novamente.");
        navigate("/login");
      } else {
        toast.error("Erro ao carregar vendas.");
      }
    }
  };

  const handleFilter = () => {
    let filtered = [...sales];

    if (startDate) {
      filtered = filtered.filter(
        (sale) => new Date(sale.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (sale) => new Date(sale.date) <= new Date(endDate)
      );
    }
    if (searchProduct.trim()) {
      filtered = filtered.filter((sale) =>
        sale.productId.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    setFilteredSales(filtered);
  };

  return (
    <div className="min-h-screen p-6 bg-[#FFFBFA]">
      <div className="relative p-4">
        <BackButton />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-[#333]">
        📋 Lista de Vendas
      </h1>

      {/* Filtros */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm">Data Inicial</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-lg bg-[#F7F0F0]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Data Final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-lg bg-[#F7F0F0]"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Nome do Produto</label>
          <input
            type="text"
            placeholder="Buscar produto"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            className="w-full p-2 border rounded-lg bg-[#F7F0F0]"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="w-full bg-[#8AF3FF] hover:bg-[#6fd6e0] text-black py-2 rounded-lg font-semibold"
          >
            Filtrar
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-white p-4 rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#8AF3FF] text-black">
            <tr>
              <th className="p-2">Produto</th>
              <th className="p-2">Quantidade</th>
              <th className="p-2">Total</th>
              <th className="p-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <tr key={sale._id} className="border-b hover:bg-[#F7F0F0]">
                  <td className="p-2">
                    {sale.productId?.name || "Produto não encontrado"}
                  </td>
                  <td className="p-2">{sale.quantity}</td>
                  <td className="p-2">
                    {(sale.quantity * sale.productId?.price).toFixed(2)} MZN
                  </td>
                  <td className="p-2">
                    {format(new Date(sale.date), "dd/MM/yyyy")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Nenhuma venda encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
