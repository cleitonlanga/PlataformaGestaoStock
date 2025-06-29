import express from "express";
import { forecastDemand } from "../utils/demandForeCast.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/:productId",
  protect(["admin", "superUser", "funcionario"]),
  async (req, res) => {
    const { productId } = req.params;

    try {
      const forecast = await forecastDemand(productId);
      res.json({ productId, forecast });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao prever demanda", error: error.message });
    }
  }
);

export default router;
