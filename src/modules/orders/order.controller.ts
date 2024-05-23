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

    // check if product available
    if (!productResult) {
      return res.status(404).json({
        success: false,
        message: 'No product found with the productId!',
        data: productResult,
      });
    }

    if (productResult.inventory.quantity < orderData.quantity) {
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
        data: productResult,
      });
    }

    const updateDoc = {
      'inventory.quantity':
        productResult.inventory.quantity - orderData.quantity,
      'inventory.inStock': // if product quantity is 0 after making the order then set inStock 'false'
        productResult.inventory.quantity - orderData.quantity < 1
          ? false
          : true,
    };
    const result = await orderServices.insertOrderData(orderData);
    await productServices.updateSingleProduct(orderData.productId, updateDoc);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

// get all orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await orderServices.getOrders(email);
    if (result.length < 1) {
      return res.json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
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

export const orderController = {
  createOrder,
  getOrders,
};
