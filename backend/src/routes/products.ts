import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

// rota GET
router.get("/products", productController.getAll);

export default router;
