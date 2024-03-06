import React, { useState } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/store";
import ProductCardInCart from "./ProductCardInCart";

export default function ProductsInCart() {
  const itemsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );

  return (
    <div className="divide-y lg:col-span-2">
      {itemsInCart.map((p) => {
        return <ProductCardInCart key={p.id} product={p} />;
      })}
    </div>
  );
}
