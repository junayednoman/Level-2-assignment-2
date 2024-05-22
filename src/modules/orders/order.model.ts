import { Schema, model } from 'mongoose';
import { IOrder } from './product.interface';

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderModel = model<IOrder>('orders', orderSchema);

export default orderModel;
