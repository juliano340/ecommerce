import { Request, Response } from "express";
import productService from "../services/productService";

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

export default {
  getAll,
};
