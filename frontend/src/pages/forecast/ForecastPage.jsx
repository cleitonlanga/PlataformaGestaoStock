import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

import ForecastForm from "./ForecastForm";
import ForecastChart from "./ForecastChart";

export default function ForecastPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Assumes an Axios interceptor is in place to handle the auth token.
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos para previsão:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
          navigate("/login");
        } else {
          toast.error("Erro ao buscar produtos.");
        }
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
      // Assumes an Axios interceptor is in place to handle the auth token.
      const response = await api.get(`/forecast/${selectedProduct}`);
      const forecastValue = response.data.forecast;
      setForecast(forecastValue);
      setChartData(generateFakeHistory(forecastValue));
    } catch (error) {
      console.error("Erro ao prever demanda:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Sua sessão expirou. Por favor, faça login novamente.");
        navigate("/login");
      } else {
        toast.error("Erro ao prever demanda.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Find the full product object to pass to the chart for more context
  const productDetails = products.find((p) => p._id === selectedProduct);

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <div className="relative p-4">
        <BackButton />
      </div>
      <h1 className="text-3xl font-semibold mb-2 text-center text-[#333]">
        Previsão de Demanda
      </h1>
      <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-center">
        Esta página utiliza dados históricos de vendas para prever a demanda
        futura de produtos. Selecione um produto abaixo para visualizar a previsão.
      </p>

      <ForecastForm
        products={products}
        selectedProduct={selectedProduct}
        onProductChange={(e) => setSelectedProduct(e.target.value)}
        onForecast={handleForecast}
        loading={loading}
      />

      <ForecastChart
        forecast={forecast}
        chartData={chartData}
        product={productDetails}
      />
    </div>
  );
}
