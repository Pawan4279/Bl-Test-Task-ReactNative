export const product = require('../../assets/jsonFiles/products.json')

export const fetchProducts = async (page, limit) => {
 
  const allProducts = product.products;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allProducts.slice(startIndex, endIndex);
};