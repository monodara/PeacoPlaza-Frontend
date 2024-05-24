import React from "react";
import { useSelector } from "react-redux";

import ProductCardInWishList from "./ProductCardInWish";
import { AppState } from "../../app/store";

export default function WishList() {
  const wishlistItems = useSelector(
    (state: AppState) => state.wishlist.wishList
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
