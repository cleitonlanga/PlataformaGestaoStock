import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import saleRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/authRoutes.js";
import forecastRoutes from "./routes/foreCast.routes.js";

const app = express();

// __dirname equivalente no ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve o React build
const frontendPath = path.resolve(__dirname, "../../frontend/dist");

//Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forecast", forecastRoutes);

app.use(express.static(frontendPath));

// Qualquer rota não API devolve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
export default app;
