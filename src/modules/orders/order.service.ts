import orderModel from './order.model';
import { IOrder } from './product.interface';

const insertOrderData = async (orderData: IOrder) => {
  const result = await orderModel.create(orderData);
  return result;
};

const getOrders = async () => {
  const result = await orderModel.find();
  return result;
};

export const orderServices = { insertOrderData , getOrders};
