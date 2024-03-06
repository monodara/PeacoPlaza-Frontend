import { ProductType } from "./type";

export const sortProducts = (
  products: ProductType[],
  order: string
): ProductType[] => {
  let newSortedProducts: ProductType[] = [...products];
  if (order === "Ascending") {
    newSortedProducts.sort((a, b) => a.price - b.price);
  } else if (order === "Descending") {
    newSortedProducts.sort((a, b) => b.price - a.price);
  }
  return newSortedProducts;
};
