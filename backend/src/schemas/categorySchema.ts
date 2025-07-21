import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório"),
});

export type CreateCategoryDTO = z.infer<typeof categorySchema>;
