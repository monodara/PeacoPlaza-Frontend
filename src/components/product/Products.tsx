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
    // logic
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  // data
  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );

  return (
    <div>
      {productList.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}
