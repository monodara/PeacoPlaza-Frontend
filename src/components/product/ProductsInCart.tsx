import React, { useState } from "react";
import ProductCardInCart from "./ProductCardInCart";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { CartProductType } from "../../misc/type";

export default function ProductsInCart() {
  const itemsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      {itemsInCart.map((p) => {
        return <ProductCardInCart key={p.id} product={p} />;
      })}
    </div>
  );
}
