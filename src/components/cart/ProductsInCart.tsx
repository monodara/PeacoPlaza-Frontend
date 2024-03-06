import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/store";
import ProductCardInCart from "./ProductCardInCart";

export default function ProductsInCart() {
  const { productsInCart } = useSelector((state: AppState) => state.cart);

  const memoizedProductCards = useMemo(
    () =>
      productsInCart.map((p) => <ProductCardInCart key={p.id} product={p} />),
    [productsInCart]
  );

  if (!productsInCart) {
    return <div>No items in cart.</div>;
  }

  return <div className="divide-y lg:col-span-2">{memoizedProductCards}</div>;
}
