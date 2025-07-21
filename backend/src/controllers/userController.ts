import { Request, Response } from "express";
import userService from "../services/userService";
import { userRegisterSchema, userLoginSchema } from "../schemas/userSchema";

const register = async (req: Request, res: Response) => {
  const validation = userRegisterSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.format() });
  }

  const { name, email, password, role } = validation.data;

  try {
    const newUser = await userService.create(name, email, password, role);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const validation = userLoginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.format() });
  }

  const { email, password } = validation.data;

  try {
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
