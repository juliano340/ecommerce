import categoryRepository from "../repositories/categoryRepository";

const getAll = async () => await categoryRepository.findAll();

const getById = async (id: number) => {
  const category = await categoryRepository.findById(id);
  if (!category) throw new Error("Categoria não encontrada");
  return category;
};

const create = async (name: string) =>
  await categoryRepository.create({ name });

const update = async (id: number, name: string) => {
  await getById(id);
  return categoryRepository.update(id, { name });
};

const remove = async (id: number) => {
  await getById(id);
  return categoryRepository.remove(id);
};

export default { getAll, getById, create, update, remove };
