import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { productServices } from '../products/product.service';
import orderValidationSchema from './order.validation';

// create orders
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const validatedOrderData = orderValidationSchema.parse(orderData);
    const productResult = await productServices.retrieveSingleProduct(
      validatedOrderData.productId,
    );

    // check if product available
    if (!productResult) {
      return res.status(404).json({
        success: false,
        message: 'No product found with the productId!',
        data: productResult,
      });
    }

    if (productResult.inventory.quantity < validatedOrderData.quantity) {
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
        data: productResult,
      });
    }

    const updateDoc = {
      'inventory.quantity':
        productResult.inventory.quantity - validatedOrderData.quantity,
      // if product quantity is 0 after making the order then set inStock 'false'
      'inventory.inStock':
        productResult.inventory.quantity - validatedOrderData.quantity < 1
          ? false
          : true,
    };
    const result = await orderServices.insertOrderData(validatedOrderData);
    await productServices.updateSingleProduct(
      validatedOrderData.productId,
      updateDoc,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
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
  } catch (error: any) {
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
