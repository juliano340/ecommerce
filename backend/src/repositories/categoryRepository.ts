import prisma from "../config/database";

const findAll = async () => prisma.category.findMany();

const findById = async (id: number) =>
  prisma.category.findUnique({ where: { id } });

const create = async (data: { name: string }) =>
  prisma.category.create({ data });

const update = async (id: number, data: { name: string }) =>
  prisma.category.update({ where: { id }, data });

const remove = async (id: number) => prisma.category.delete({ where: { id } });

export default { findAll, findById, create, update, remove };
