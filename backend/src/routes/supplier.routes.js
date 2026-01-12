import express from "express";
import * as controller from "../controllers/supplier.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect(), controller.createSupplier);
router.get("/", protect(), controller.getSuppliers);
router.get("/:id", protect(), controller.getSupplierById);
router.put("/:id", protect(), controller.updateSupplier);
router.delete("/:id", protect(), controller.deleteSupplier);

export default router;
