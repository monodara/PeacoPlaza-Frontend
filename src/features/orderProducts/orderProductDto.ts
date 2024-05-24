import { BaseEntity } from "../../commonTypes/baseEntity";
import { ProductReadDto } from "../products/productDto";

export interface OrderProductReadDto extends BaseEntity{
  product: ProductReadDto;
  productId: string;
  quantity: number;
}

export interface OrderProductCreateDto {
  productId: string;
  quantity: number;
}