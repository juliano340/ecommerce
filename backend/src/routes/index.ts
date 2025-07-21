import { Router } from "express";
import productController from "../controllers/productController";
import userController from "../controllers/userController";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware";
import categoryController from "../controllers/categoryController";
import orderController from "../controllers/orderController";

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

// categorias
router.get("/categories", authenticateToken, categoryController.getAll);
router.get("/categories/:id", authenticateToken, categoryController.getById);
router.post(
  "/categories",
  authenticateToken,
  authorizeRole("ADMIN"),
  categoryController.create
);
router.put(
  "/categories/:id",
  authenticateToken,
  authorizeRole("ADMIN"),
  categoryController.update
);
router.delete(
  "/categories/:id",
  authenticateToken,
  authorizeRole("ADMIN"),
  categoryController.remove
);

router.post("/orders", authenticateToken, orderController.create);
router.get("/orders/mine", authenticateToken, orderController.getMine);
router.get(
  "/orders/:id",
  authenticateToken,
  authorizeRole("ADMIN"),
  orderController.getById
);

export default router;
