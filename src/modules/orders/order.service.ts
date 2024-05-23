import orderModel from './order.model';
import { IOrder } from './product.interface';

const insertOrderData = async (orderData: IOrder) => {
  const result = await orderModel.create(orderData);
  return result;
};

const getOrders = async (email: unknown) => {
  const query = { email: email };
  const result = await orderModel.find(email ? query : {});
  return result;
};

export const orderServices = { insertOrderData, getOrders };
