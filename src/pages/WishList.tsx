import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import ProductCard from "../components/product/ProductCard";

export default function WishList() {
  const wishlistItems = useSelector(
    (state: AppState) => state.products.wishList
  );
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 mx-auto">
      {wishlistItems.map((p) => {
        return <ProductCard key={p.id} product={p} />;
      })}
    </div>
  );
}
