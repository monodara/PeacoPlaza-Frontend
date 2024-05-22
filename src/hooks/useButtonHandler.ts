import React from "react";
import { useDispatch } from "react-redux";

import { ProductType } from "../misc/type";
import { addToCart } from "../redux/slices/cartSlice";
// import { addToWishList } from "../features/products/productSlice";
import { ProductReadDto } from "../features/products/productDto";

export function useCartButtonHandler() {
  const dispatch = useDispatch();

  return function cartButtonHandler(item: ProductReadDto) {
    dispatch(addToCart(item));
  };
}

export function useHeartButtonHandler() {
  const dispatch = useDispatch();

  // return function heartButtonHandler(item: ProductReadDto) {
  //   dispatch(addToWishList(item));
  // };
}
