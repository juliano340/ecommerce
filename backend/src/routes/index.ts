import { Router } from "express";
import productController from "../controllers/productController";
import userController from "../controllers/userController";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware";

const router = Router();

// Rotas de usuário
router.post("/users", userController.register);
router.post("/login", userController.login);

// Rotas de produto
router.get("/products", authenticateToken, productController.getAll);
router.get("/products/:id", authenticateToken, productController.getById);
router.post(
  "/products",
  authenticateToken,
  authorizeRole("ADMIN"),
  productController.create
);
router.put(
  "/products/:id",
  authenticateToken,
  authorizeRole("ADMIN"),
  productController.update
);
router.delete(
  "/products/:id",
  authenticateToken,
  authorizeRole("ADMIN"),
  productController.remove
);

export default router;
