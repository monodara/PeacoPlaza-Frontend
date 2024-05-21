import { number } from "yup";
import { ProductReadDto } from "../features/products/productDto";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  productImages: ProductImage[];
};
export type ProductCreatedType = Omit<ProductType, "id" | "category"> & {
  categoryId: number;
};
export type ProductImage = {
  id: string;
  data: string;
}
export type CartProductType = ProductReadDto & {
  amount: number;
};
export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type UserRegisterType = {
  username: string;
  email: string;
  password?: string;
};

export type UserType = UserRegisterType & {
  role: "Customer" | "Admin";
  id?: number;
  avatar?: string;
};
