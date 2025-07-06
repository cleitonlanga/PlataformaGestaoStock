import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ForecastChart({ forecast, chartData, product }) {
  if (forecast === null || !product) {
    return null;
  }

  // Generates a descriptive text based on the forecast and current stock.
  const getRecommendationText = () => {
    if (forecast > 0) {
      let text = `A previsão de demanda para os próximos 7 dias é de **${forecast} unidades**. Seu estoque atual é de **${product.stock} unidades**.`;
      if (forecast > product.stock) {
        text +=
          ' Recomenda-se fazer um novo pedido para evitar uma possível ruptura de estoque.';
      } else if (forecast > product.stock / 2) {
        text +=
          ' Seu estoque parece suficiente, mas é bom monitorar as vendas de perto.';
      } else {
        text +=
          ' Seu estoque atual é suficiente para cobrir a demanda prevista com uma margem segura.';
      }
      return text;
    }
    return 'Nenhuma demanda é prevista para este produto no próximo período. Não é necessário fazer um novo pedido no momento.';
  };

  // A small helper to render text with bold tags from markdown-like syntax.
  const renderTextWithBold = (text) => {
    return text
      .split('**')
      .map((part, index) =>
        index % 2 === 1 ? <strong key={index} className="text-gray-900">{part}</strong> : part
      );
  };

  return (
    <div className="mt-6 bg-[#FFFBFA] rounded-lg p-6 shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Análise da Previsão
      </h2>
      <p className="text-gray-700 mb-4 text-base leading-relaxed">
        {renderTextWithBold(getRecommendationText())}
      </p>
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
  );
}
