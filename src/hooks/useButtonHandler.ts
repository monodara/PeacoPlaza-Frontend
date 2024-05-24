import React from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cart/cartSlice";
import { ProductReadDto } from "../features/products/productDto";
import { addToWishList } from "../features/wishlists/wishlistSlice";

export function useCartButtonHandler() {
  const dispatch = useDispatch();

  return function cartButtonHandler(item: ProductReadDto) {
    dispatch(addToCart(item));
  };
}

export function useHeartButtonHandler() {
  const dispatch = useDispatch();

  return function heartButtonHandler(item: ProductReadDto) {
    dispatch(addToWishList(item));
  };
}
