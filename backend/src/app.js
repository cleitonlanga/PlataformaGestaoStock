import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
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

// --- Static file serving and catch-all route ---

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// The "catch-all" handler: for any request that doesn't
// match one of the API routes above, send back React's index.html file.
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export default app;
