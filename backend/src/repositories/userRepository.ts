import prisma from "../config/database";

const create = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      // password: false
    },
  });
};

const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export default {
  create,
  findByEmail,
};
