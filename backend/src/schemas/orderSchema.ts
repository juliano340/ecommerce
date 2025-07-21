import { z } from "zod";

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Pedido deve ter ao menos um item"),
});

export type CreateOrderDTO = z.infer<typeof orderSchema>;
