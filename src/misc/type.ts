import { number } from "yup";

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
export type CartProductType = ProductType & {
  amount: number;
};
export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type UserRegisterType = {
  name: string;
  email: string;
  password?: string;
  avatar: string;
};

export type UserType = UserRegisterType & {
  role: "customer" | "admin";
  id?: number;
};
