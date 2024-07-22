export const product = require('../../assets/jsonFiles/products.json')
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const fetchProducts = async (page, limit) => {
 
  const allProducts = product.products;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return allProducts.slice(startIndex, endIndex);
};


const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export {width,height, horizontalScale, verticalScale, moderateScale };