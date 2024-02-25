import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { ProductType } from "../../misc/type";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

export default function ProductsFetchData() {
  const dispatch = useAppDispatch();
  let url = "https://api.escuelajs.co/api/v1/products";
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  if (categoryId) url += `/?categoryId=${categoryId}`;
  // use fetchAllProductsAsync
  useEffect(() => {
    dispatch(fetchAllProductsAsync(url));
  }, [url]);

  // data
  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );
  const searchKeyword: string = useSelector(
    (state: AppState) => state.products.searchKeyword
  );
  const filteredProducts = productList.filter((p) => {
    return (
      // p.images.length === 3 && //filter test data
      p.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4">
      {filteredProducts.length === 0 && (
        <div className="mt-10 text-center">
          No such product. Maybe tried again.
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
