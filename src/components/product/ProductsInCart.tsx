import React from "react";
import ProductCardInCart from "./ProductCardInCart";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";

export default function ProductsInCart() {
  const itemsInCart = useSelector(
    (state: AppState) => state.products.productsInCart
  );
  return (
    <div>
      {itemsInCart.map((p) => {
        return <ProductCardInCart key={p.id} product={p} />;
      })}
    </div>
  );
}
