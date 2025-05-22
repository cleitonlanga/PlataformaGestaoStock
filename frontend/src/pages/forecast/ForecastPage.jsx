import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ForecastPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log("Erro ao buscar produtos forecast:", error);
        toast.error("Erro ao buscar produtos");
      }
    }

    fetchProducts();
  }, []);

  const generateFakeHistory = (forecastValue) => {
    const base = forecastValue - 5;
    const data = Array.from({ length: 6 }, (_, i) => ({
      dia: `Dia ${i + 1}`,
      demanda: Math.floor(base + Math.random() * 10),
    }));
    data.push({ dia: "Previsão", demanda: forecastValue });
    return data;
  };

  const handleForecast = async () => {
    if (!selectedProduct) {
      toast.warning("Selecione um produto");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`api/forecast/${selectedProduct}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const forecastValue = response.data.forecast;
      setForecast(forecastValue);
      setChartData(generateFakeHistory(forecastValue));
    } catch (error) {
      console.log("Erro ao prever demanda", error);
      toast.error("Erro ao prever demanda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <div className="relative p-4">
        <BackButton />
      </div>
      <h1 className="text-3xl font-semibold mb-4 text-[#333]">
        Previsão de Demanda
      </h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-2xl mx-auto">
        <label className="block mb-2 text-gray-700 font-medium">
          Selecione um produto:
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        >
          <option value="">-- Selecione --</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleForecast}
          disabled={loading}
          className="bg-[#8AF3FF] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition"
        >
          {loading ? "Carregando..." : "Ver Previsão"}
        </button>

        {forecast !== null && (
          <div className="mt-6 bg-[#FFFBFA] rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Previsão: {forecast} unidades
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="demanda"
                  stroke="#8AF3FF"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
