import { TProduct } from './product.interface';
import productModel from './product.model';

const insertProductData = async (productData: TProduct) => {
  const result = await productModel.create(productData);
  return result;
};

const retrieveProduct = async (searchTerm: unknown) => {
  const sarchRegax = new RegExp(searchTerm, 'i');
  const query = {};
  const searchQuery = { name: sarchRegax };
  const projection = { _id: 0, 'variants._id': 0, 'inventory._id': 0, __v: 0 };
  const result = await productModel.find(
    searchTerm ? searchQuery : query,
    projection,
  );
  return result;
};
const retrieveProductByName = async (name: string) => {
  const query = { name: name };
  const projection = { _id: 0, 'variants._id': 0, 'inventory._id': 0, __v: 0 };
  const result = await productModel.find(query, projection);
  return result;
};
const retrieveSingleProduct = async (id: string) => {
  const query = { _id: id };
  const projection = { _id: 0, 'variants._id': 0, 'inventory._id': 0, __v: 0 };
  const result = await productModel.findOne(query, projection);
  return result;
};
const updateSingleProduct = async (id: string, updateDoc: unknown) => {
  const query = { _id: id };
  const result = await productModel.updateOne(query, updateDoc);
  return result;
};
const deleteSingleProduct = async (id: string) => {
  const query = { _id: id };
  const result = await productModel.deleteOne(query);
  return result;
};

export const productServices = {
  insertProductData,
  retrieveProduct,
  retrieveSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  retrieveProductByName,
};
