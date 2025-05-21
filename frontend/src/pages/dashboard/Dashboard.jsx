import React from 'react'
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, suppliersRes, salesRes] = await Promise.all([
          api.get("/products"),
          api.get("/suppliers"),
          api.get("/sales"),
        ]);

        const totalRevenue = salesRes.data.reduce((acc, sale) => acc + sale.total, 0);

        setStats({
          totalProducts: productsRes.data.length,
          totalSuppliers: suppliersRes.data.length,
          totalSales: salesRes.data.length,
          totalRevenue,
        });
      } catch (error) {
        toast.error(error, "Erro ao carregar os dados do dashboard.");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-[#F7F0F0]">
      <h1 className="text-3xl font-bold text-[#8AF3FF] mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Produtos" value={stats.totalProducts} />
        <StatCard label="Fornecedores" value={stats.totalSuppliers} />
        <StatCard label="Vendas" value={stats.totalSales} />
        <StatCard label="Receita (MZN)" value={stats.totalRevenue.toFixed(2)} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#FFFBFA] p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-xl text-gray-700 mb-2">{label}</h2>
      <p className="text-3xl font-bold text-[#8AF3FF]">{value}</p>
    </div>
  );
}
