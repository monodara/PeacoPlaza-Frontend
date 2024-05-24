import { OrderProductCreateDto, OrderProductReadDto } from "../orderProducts/orderProductDto";

export interface OrderReadDto {
  id: string;
  orderDate: string;
  status: string;
  userId: string;
  dateOfDelivery: string | null;
  orderProducts: OrderProductReadDto[];
}

export interface OrderCreateDto {
  addressId: string;
  orderProducts: OrderProductCreateDto[];
}

export interface OrderUpdateDto {
  status: string;
  dateOfDelivery: string | null;
}