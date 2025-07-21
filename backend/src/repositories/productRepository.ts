import prisma from "../config/database";

const findAll = async () => {
  return await prisma.product.findMany();
};

const findById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const create = async (data: { name: string; price: number }) => {
  return await prisma.product.create({
    data,
  });
};

const update = async (id: string, data: { name?: string; price?: number }) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

const remove = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
