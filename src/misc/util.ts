import { ProductReadDto } from "../features/products/productDto";

// misc/util.ts
export const sortProducts = (
  products: ProductReadDto[],
  order: string
): ProductReadDto[] => {
  let newSortedProducts: ProductReadDto[] = [...products];

  if (order === "Ascending") {
    newSortedProducts.sort((a, b) => a.price - b.price);
  } else if (order === "Descending") {
    newSortedProducts.sort((a, b) => b.price - a.price);
  }

  return newSortedProducts;
};
