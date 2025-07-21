import prisma from "../config/database";

const create = async (
  userId: number,
  items: { productId: number; quantity: number; price: number }[],
  total: number
) => {
  return await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map((i) => ({
          product: { connect: { id: i.productId } },
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
    include: { items: true },
  });
};

const findByUser = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: true },
  });
};

const findById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
};

export default { create, findByUser, findById };
