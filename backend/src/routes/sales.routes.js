import express from "express";
import * as controller from "../controllers/sales.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", controller.createSale, protect);
router.get("/", controller.getAllSales, protect);
router.get("/report", controller.getSalesReport, protect);
router.get("/:id", controller.getSaleById, protect);

router.delete("/:id", controller.deleteSale, protect);

export default router;
