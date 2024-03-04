import React from "react";
import { useDispatch } from "react-redux";

import { ProductType } from "../misc/type";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishList } from "../redux/slices/productSlice";

export function useCartButtonHandler() {
  const dispatch = useDispatch();

  return function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  };
}

export function useHeartButtonHandler() {
  const dispatch = useDispatch();

  return function heartButtonHandler(item: ProductType) {
    dispatch(addToWishList(item));
  };
}
