import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().positive("Preço deve ser um número positivo"),
});

export type CreateProductDTO = z.infer<typeof productSchema>;

export const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
});

export type UpdateProductDTO = z.infer<typeof productUpdateSchema>;
