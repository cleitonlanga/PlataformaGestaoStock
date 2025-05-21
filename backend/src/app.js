import express from "express";
import cors from "cors";
import "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import saleRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/authRoutes.js";
import forecastRoutes from "./routes/foreCast.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forecast", forecastRoutes);
export default app;
