import productRepository from "../repositories/productRepository";

const getAll = async () => {
  return await productRepository.findAll();
};

const getById = async (id: number) => {
  const product = await productRepository.findById(id);
  if (!product) throw new Error("Produto não encontrado");
  return product;
};

const create = async (name: string, price: number) => {
  return await productRepository.create({ name, price });
};

const update = async (id: number, name?: string, price?: number) => {
  await getById(id);
  return await productRepository.update(id, { name, price });
};

const remove = async (id: number) => {
  await getById(id);
  return await productRepository.remove(id);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
