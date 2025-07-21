import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const create = async (
  name: string,
  email: string,
  password: string,
  role?: "ADMIN" | "USER"
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
};

const login = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { token };
};

export default {
  create,
  login,
};
