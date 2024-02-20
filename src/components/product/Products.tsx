import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { ProductType } from "../../misc/type";
import ProductCard from "./ProductCard";

export default function ProductsFetchData() {
  const dispatch = useAppDispatch();

  // use fetchAllProductsAsync
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  // data
  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );
  const searchKeyword: string = useSelector(
    (state: AppState) => state.products.userInput
  );
  const filteredProducts = productList.filter((p) => {
    return p.title.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  return (
    <div>
      {filteredProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
