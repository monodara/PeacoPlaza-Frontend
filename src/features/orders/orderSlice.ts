import createBaseSlice from "../../app/BaseSlice"
import { OrderCreateDto, OrderReadDto, OrderUpdateDto } from "./orderDto"

const { slice, actions } = createBaseSlice<OrderReadDto, OrderCreateDto, OrderUpdateDto>("orders", "/orders")

export const ordersReducer = slice.reducer
export const ordersActions = actions