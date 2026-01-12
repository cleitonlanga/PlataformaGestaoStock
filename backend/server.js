import app from "./src/app.js";
import dotenv from "dotenv";
import connectMongoDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor a correr na porta ${PORT}`);
  connectMongoDB();
});
