import express from "express";
import * as controller from "../controllers/supplier.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", controller.createSupplier, protect);
router.get("/", controller.getSuppliers, protect);
router.get("/:id", controller.getSupplierById, protect);
router.put("/:id", controller.updateSupplier, protect);
router.delete("/:id", controller.deleteSupplier, protect);

export default router;
