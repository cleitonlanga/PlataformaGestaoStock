import express from "express";
import * as controller from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", controller.getAll, protect);
router.get("/:id", controller.getById, protect);
router.post("/", controller.create, protect);
router.put("/:id", controller.update, protect);
router.delete("/:id", controller.remove, protect);

export default router;
