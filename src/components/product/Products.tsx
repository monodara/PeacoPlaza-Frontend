import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { ProductType } from "../../misc/type";
import ProductCard from "./ProductCard";

export default function ProductsFetchData({ url }: { url: string }) {
  const dispatch = useAppDispatch();
  // use fetchAllProductsAsync
  useEffect(() => {
    dispatch(fetchAllProductsAsync(url));
  }, [dispatch]);

  // data
  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );
  const searchKeyword: string = useSelector(
    (state: AppState) => state.products.userInput
  );
  const filteredProducts = productList.filter((p) => {
    return (
      p.images.length === 3 && //filter test data
      p.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
