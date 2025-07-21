import orderRepository from "../repositories/orderRepository";
import productRepository from "../repositories/productRepository";

interface OrderItemInput {
  productId: number;
  quantity: number;
}

const create = async (userId: number, items: OrderItemInput[]) => {
  const productIds = items.map((i) => i.productId);

  const products = await Promise.all(
    productIds.map((pid) => productRepository.findById(pid))
  );

  let total = 0;
  const orderItems = items.map((item, idx) => {
    const product = products[idx];
    if (!product) throw new Error(`Produto ${item.productId} não encontrado`);

    const price = product.price;
    total += price * item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: price,
    };
  });

  return await orderRepository.create(userId, orderItems, total);
};

const getByUser = async (userId: number) => {
  return await orderRepository.findByUser(userId);
};

const getById = async (id: number) => {
  const order = await orderRepository.findById(id);
  if (!order) throw new Error("Pedido não encontrado");
  return order;
};

export default {
  create,
  getByUser,
  getById,
};
