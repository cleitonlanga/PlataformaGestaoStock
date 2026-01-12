import React from "react";

export default function ForecastForm({
  products,
  selectedProduct,
  onProductChange,
  onForecast,
  loading,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-6 max-w-2xl mx-auto">
      <label className="block mb-2 text-gray-700 font-medium">
        Selecione um produto:
      </label>
      <select
        value={selectedProduct}
        onChange={onProductChange}
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
        onClick={onForecast}
        disabled={loading}
        className="bg-[#8AF3FF] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition"
      >
        {loading ? "Carregando..." : "Ver Previsão"}
      </button>
    </div>
  );
}
