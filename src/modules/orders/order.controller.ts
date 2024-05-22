import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { productServices } from '../products/product.service';

// create orders
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const productResult = await productServices.retrieveSingleProduct(
      orderData.productId,
    );
    if (productResult !== null && productResult) {
      const result = await orderServices.insertOrderData(orderData);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No product found with the productId!',
        data: productResult,
      });
    }
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

// create orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

export const orderController = { createOrder, getOrders };
