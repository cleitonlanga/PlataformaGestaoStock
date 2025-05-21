import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import { AuthProvider } from "./pages/context/AuthContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </AuthProvider>
  </StrictMode>
);
