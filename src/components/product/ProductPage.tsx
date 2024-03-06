import React, { useEffect, useState } from "react";
import Products from "./Products";
import SearchForm from "../search/SearchForm";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { ProductType } from "../../misc/type";
import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import ProductPagination from "./ProductPagination";
import ProductCard from "./ProductCard";

interface Props {
  url: string;
}

export default function ProductPage({ url }: Props) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const limit = rowsPerPage;
    const offset = (page - 1) * rowsPerPage;
    const limitUrl = `${url}&offset=${offset}&limit=${limit}`;
    dispatch(fetchAllProductsAsync(limitUrl));
  }, [dispatch, page, rowsPerPage]);

  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );
  const count = productList.length;
  console.log(productList.length);

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ProductPagination count={count} page={page} setPage={setPage} />
    </div>
  );
}
