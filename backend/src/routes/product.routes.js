import express from "express";
import * as controller from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect(), controller.getAll);
router.get("/:id", protect(), controller.getById);
router.post("/", protect(), controller.create);
router.put("/:id", protect(), controller.update);
router.delete("/:id", protect(), controller.remove);

export default router;
