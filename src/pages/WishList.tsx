import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import ProductCard from "../components/product/ProductCard";
import ProductCardInWishList from "../components/product/ProductCardInWish";

export default function WishList() {
  const wishlistItems = useSelector(
    (state: AppState) => state.products.wishList
  );
  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {wishlistItems.map((p) => {
          return <ProductCardInWishList key={p.id} product={p} />;
        })}
      </div>
    </div>
  );
}
