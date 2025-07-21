import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["ADMIN", "USER"]).optional(),
});

export type RegisterUserDTO = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginUserDTO = z.infer<typeof userLoginSchema>;
