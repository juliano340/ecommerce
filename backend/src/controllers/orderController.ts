import { Request, Response } from "express";
import orderService from "../services/orderService";
import { orderSchema } from "../schemas/orderSchema";

const create = async (req: Request & { user?: any }, res: Response) => {
  // valida o body com Zod
  const validation = orderSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.format() });
  }

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const parsedItems = validation.data.items.map((item) => ({
      productId: Number(item.productId),
      quantity: item.quantity,
    }));

    const order = await orderService.create(
      Number(req.user.userId),
      parsedItems
    );
    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getMine = async (req: Request & { user?: any }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const orders = await orderService.getByUser(Number(req.user.userId));
    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const order = await orderService.getById(orderId);
    return res.json(order);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export default { create, getMine, getById };
