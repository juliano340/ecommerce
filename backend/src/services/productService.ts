import productRepository from "../repositories/productRepository";

const getAll = async () => {
  return await productRepository.findAll();
};

export default {
  getAll,
};
