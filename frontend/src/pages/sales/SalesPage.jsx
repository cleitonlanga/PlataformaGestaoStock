import { useNavigate } from "react-router-dom";
import { FaList, FaPlus, FaChartBar } from "react-icons/fa";

export default function SalesPage() {
  const navigate = useNavigate();

  const menuOptions = [
    {
      title: "Listar Vendas",
      description: "Visualize todas as vendas registradas",
      icon: <FaList size={30} />,
      onClick: () => navigate("/sales/list"),
    },
    {
      title: "Criar Venda",
      description: "Registre uma nova venda",
      icon: <FaPlus size={30} />,
      onClick: () => navigate("/sales/create"),
    },
    {
      title: "Relatório de Vendas",
      description: "Veja um resumo e estatísticas das vendas",
      icon: <FaChartBar size={30} />,
      onClick: () => navigate("/sales/report"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F0F0] p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestão de Vendas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuOptions.map((option, index) => (
          <div
            key={index}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col justify-between"
            onClick={option.onClick}
          >
            <div className="flex items-center gap-4 mb-4 text-[#8AF3FF]">
              {option.icon}
              <h2 className="text-xl font-semibold text-gray-800">{option.title}</h2>
            </div>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
