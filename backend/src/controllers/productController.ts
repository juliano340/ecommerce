import { Request, Response } from "express";
import productService from "../services/productService";
import { productSchema } from "../schemas/productSchema";

const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getById(id);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  const validation = productSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.format() });
  }

  const { name, price } = validation.data;
  try {
    const { name, price } = req.body;
    const newProduct = await productService.create(name, price);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const updatedProduct = await productService.update(id, name, price);
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await productService.remove(id);
    res.json({ message: "Produto removido com sucesso" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
