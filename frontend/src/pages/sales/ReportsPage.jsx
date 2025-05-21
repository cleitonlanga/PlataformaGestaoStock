import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const COLORS = ["#8AF3FF", "#F7F0F0", "#FFFBFA", "#b2ebf2", "#ffccbc"];

export default function ReportsPage() {
  const [sales, setSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("/api/sales/report"); // Precisa de endpoint
      console.log(data);
      setSales(data.sales);
      setTotalRevenue(data.totalRevenue);
      setTopProducts(data.topProducts);
    } catch (err) {
      console.error("Erro ao carregar relatório", err);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[#FFFBFA] min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-[#333]">Relatórios</h1>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#8AF3FF] p-4 rounded-xl shadow">
          <h2 className="font-bold text-lg">Total de Vendas</h2>
          <p className="text-2xl">{sales.length}</p>
        </div>
        <div className="bg-[#F7F0F0] p-4 rounded-xl shadow">
          <h2 className="font-bold text-lg">Receita Total</h2>
          <p className="text-2xl">MZN {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-[#8AF3FF] p-4 rounded-xl shadow">
          <h2 className="font-bold text-lg">Produto Mais Vendido</h2>
          <p className="text-xl">{topProducts[0]?.name || "N/D"}</p>
        </div>
        <div className="bg-[#F7F0F0] p-4 rounded-xl shadow">
          <h2 className="font-bold text-lg">Última Venda</h2>
          <p className="text-sm">
            {sales.length
              ? format(
                  new Date(sales[sales.length - 1].date),
                  "dd/MM/yyyy HH:mm"
                )
              : "N/D"}
          </p>
        </div>
      </div>

      {/* Gráfico de barras: vendas por produto */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Produtos Mais Vendidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8AF3FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de pizza: proporção de vendas */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Distribuição das Vendas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topProducts}
              dataKey="quantity"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {topProducts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
