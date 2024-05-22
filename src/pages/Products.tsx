import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";
import { ProductType } from "../misc/type";
import { AppState, useAppDispatch } from "../redux/store";
import { fetchAllProductsAsync } from "../redux/slices/productSlice";
import ProductFilters from "../components/product/ProductFilter";
import ProductSort from "../components/product/ProductSort";
import { sortProducts } from "../misc/util";
import ProductPagination from "../components/product/ProductPagination";
import { productsEndpoint } from "../misc/endpoints";
import { ProductReadDto } from "../features/products/productDto";

export default function Products() {
  const dispatch = useAppDispatch();
  // const searchKeyword: string = useSelector(
  //     (state: AppState) => state.products.searchKeyword
  //   );
  let filterProductsUrlSuffix = "";
  
  
  const [totalPage, setTotalPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pageSize = 12;
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("searchKey");
  if(searchKeyword && searchKeyword.trim() !== ""){
    console.log("here")
    filterProductsUrlSuffix += `?searchKey=${searchKeyword}`;
  }
  // const categoryId = searchParams.get("categoryId");
  // if (categoryId) url += `&categoryId=${categoryId}`;
  const minPrice = searchParams.get("price_min");
  if (minPrice) filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?minPrice=${minPrice}` : `&minPrice=${minPrice}`;
  const maxPrice = searchParams.get("price_max");
  if (maxPrice) filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?maxPrice=${maxPrice}` : `&maxPrice=${maxPrice}`;

  console.log(filterProductsUrlSuffix);

  async function fetchTotalProductCount() {
      try {
        const response = await fetch(`${productsEndpoint}count/${filterProductsUrlSuffix}`);
        const data = await response.json();
        setTotalPage(Math.ceil(data/pageSize));
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    }
  let sortPaginateProductsUrlSuffix = filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?pageNo=${page}&pageSize=${pageSize}` :`&pageNo=${page}&pageSize=${pageSize}`;
  useEffect(() => {
    fetchTotalProductCount();
    dispatch(fetchAllProductsAsync(`${productsEndpoint}${sortPaginateProductsUrlSuffix}`));
    console.log(`${productsEndpoint}${sortPaginateProductsUrlSuffix}`);
  }, [filterProductsUrlSuffix,page]);

  
  const productList: ProductReadDto[] = useSelector(
    (state: AppState) => state.products.products
  );
  console.log(productList);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen, dropdownRef]);

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center">
        <ProductFilters />
        <ProductSort
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
      {productList.length === 0 && (
        <div className="mt-10 text-center">
          No such product. Maybe try again.
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <ProductPagination count={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
