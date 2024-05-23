import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

// create product doc
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const validatedProductData = productValidationSchema.parse(productData);
    const productExistenceResult = await productServices.retrieveProductByName(
      validatedProductData.name,
    );
    // check if product already exist with name
    if (productExistenceResult.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Product already exist with this name!',
        data: productExistenceResult,
      });
    }
    const result =
      await productServices.insertProductData(validatedProductData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      data: error,
    });
  }
};

// get all products
const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await productServices.retrieveProduct(searchTerm);
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
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

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.retrieveSingleProduct(id);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateData = req.body;
    const updateResult = await productServices.updateSingleProduct(
      id,
      updateData,
    );
    if (updateResult.modifiedCount === 1) {
      const result = await productServices.retrieveSingleProduct(id);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Failed to update!',
        data: updateResult,
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

// delete single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    const deleteResult = await productServices.deleteSingleProduct(id);
    if (deleteResult.deletedCount === 1) {
      const result = await productServices.retrieveSingleProduct(id);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Failed to delete!',
        data: deleteResult,
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

export const productController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
