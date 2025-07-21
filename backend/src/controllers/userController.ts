import { Request, Response } from "express";
import userService from "../services/userService";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await userService.create(name, email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export default {
  register,
  login,
};
