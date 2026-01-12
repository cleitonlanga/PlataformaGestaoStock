import express from "express";
import * as controller from "../controllers/sales.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect(), controller.createSale);
router.get("/", protect(), controller.getAllSales);
router.get("/report", protect(), controller.getSalesReport);
router.get("/:id", protect(), controller.getSaleById);

router.delete("/:id", protect(), controller.deleteSale);

export default router;
