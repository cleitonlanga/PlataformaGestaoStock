import { useState } from "react";
import BackButton from "@/components/BackButton";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("pt");
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sans");

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  return (
    <div className="relative p-4">
      <div className="relative p-4">
        <BackButton />
      </div>

      <h1 className="text-3xl font-semibold mb-6 text-[#333]">Configurações</h1>

      {/* Notificações */}
      <div className="mb-4 border rounded-md">
        <button
          onClick={() => toggleSection("notifications")}
          className="w-full text-left p-4 font-medium bg-gray-100 hover:bg-gray-200"
        >
          Notificações
        </button>
        {openSection === "notifications" && (
          <div className="p-4 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              Ativar notificações
            </label>
          </div>
        )}
      </div>

      {/* Preferências */}
      <div className="mb-4 border rounded-md">
        <button
          onClick={() => toggleSection("preferences")}
          className="w-full text-left p-4 font-medium bg-gray-100 hover:bg-gray-200"
        >
          Preferências
        </button>
        {openSection === "preferences" && (
          <div className="p-4 space-y-2">
            <label>
              Idioma:
              <select
                className="ml-2 border px-2 py-1 rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
              </select>
            </label>
          </div>
        )}
      </div>

      {/* Interface */}
      <div className="mb-4 border rounded-md">
        <button
          onClick={() => toggleSection("interface")}
          className="w-full text-left p-4 font-medium bg-gray-100 hover:bg-gray-200"
        >
          Interface
        </button>
        {openSection === "interface" && (
          <div className="p-4 space-y-4">
            <div>
              <label className="mr-2 font-medium">Tema:</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>

            <div>
              <label className="mr-2 font-medium">Fonte:</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="sans">Sans</option>
                <option value="serif">Serif</option>
                <option value="mono">Monoespaçada</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
