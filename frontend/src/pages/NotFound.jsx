import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBFA] text-gray-800 p-8">
      <div className="relative p-4">
        <BackButton />
      </div>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Página não encontrada.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#8AF3FF] text-black rounded hover:bg-[#72e1ee] transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFound;
