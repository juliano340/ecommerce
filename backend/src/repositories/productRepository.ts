import prisma from "../config/database";

const findAll = async () => {
  return await prisma.product.findMany();
};

export default {
  findAll,
};
