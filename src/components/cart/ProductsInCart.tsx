import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/store";
import ProductCardInCart from "./ProductCardInCart";
import { useTheme } from "../contextAPI/ThemeContext";

export default function ProductsInCart() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const secondaryColor = theme.palette.secondary.main;
  const backgroundColor = theme.palette.background.default;
  const { productsInCart } = useSelector((state: AppState) => state.cart);

  const memoizedProductCards = useMemo(
    () =>
      productsInCart.map((p) => <ProductCardInCart key={p.id} product={p} />),
    [productsInCart]
  );

  if (!productsInCart) {
    return <div style={{ color: textPrimaryColor }}>No items in cart.</div>;
  }

  return <div className="divide-y lg:col-span-2">{memoizedProductCards}</div>;
}
