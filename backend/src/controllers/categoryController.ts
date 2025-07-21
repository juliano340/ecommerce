import { Request, Response } from "express";
import categoryService from "../services/categoryService";

const getAll = async (req: Request, res: Response) => {
  try {
    res.json(await categoryService.getAll());
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    res.json(await categoryService.getById(id));
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    res.status(201).json(await categoryService.create(name));
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const id = Number(req.params.id);
    res.json(await categoryService.update(id, name));
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await categoryService.remove(id);
    res.json({ message: "Categoria removida com sucesso" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default { getAll, getById, create, update, remove };
