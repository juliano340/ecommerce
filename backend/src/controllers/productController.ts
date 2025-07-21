import { Request, Response } from "express";
import productService from "../services/productService";

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
    const { id } = req.params;
    const product = await productService.getById(id);
    res.json(product);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
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
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedProduct = await productService.update(id, name, price);
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
