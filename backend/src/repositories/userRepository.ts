import prisma from "../config/database";

const create = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

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
