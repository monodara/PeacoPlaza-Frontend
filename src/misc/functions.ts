import { addToCart } from "../redux/slices/cartSlice";
import { ProductType } from "./type";
import { addToWishList } from "../redux/slices/productSlice";
import { useCustomDispatch } from "../hooks/useCustomDispatch";

const dispatch = useCustomDispatch();

export function cartButtonHandler(item: ProductType) {
  dispatch(addToCart(item));
}
export function heartButtonHandler(item: ProductType) {
  dispatch(addToWishList(item));
}
