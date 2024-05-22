import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../features/products/ProductCard";
import { AppState, useAppDispatch } from "../redux/store";
import ProductFilters from "../features/products/ProductFilter";
import ProductSort from "../features/products/ProductSort";
import ProductPagination from "../features/products/ProductPagination";
import { productsEndpoint } from "../misc/endpoints";
import { ProductReadDto } from "../features/products/productDto";
import { productsActions } from "../features/products/productSlice";

export default function Products() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  let filterProductsUrlSuffix = "";
  const searchKeyword: string = useSelector(
      (state: AppState) => state.filterSort.searchKeyword
    );
  const minPrice: string = useSelector(
      (state: AppState) => state.filterSort.minPrice
    );
  const maxPrice: string = useSelector(
      (state: AppState) => state.filterSort.maxPrice
    );
  const selectCategory: string | undefined = useSelector(
      (state: AppState) => state.filterSort.byCategory
    );
  const sortType: string = useSelector(
      (state: AppState) => state.filterSort.sortBy
    );
  const order: string = useSelector(
      (state: AppState) => state.filterSort.orderBy
    );
  
  const [totalPage, setTotalPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  if(searchKeyword && searchKeyword.trim() !== ""){
    filterProductsUrlSuffix += `?searchKey=${searchKeyword}`;
  }
  if (minPrice !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?minPrice=${minPrice}` : `&minPrice=${minPrice}`;
  if (maxPrice !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?maxPrice=${maxPrice}` : `&maxPrice=${maxPrice}`;
  if (selectCategory !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?categoriseBy=${selectCategory}` : `&categoriseBy=${selectCategory}`;

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
  if(order !== "") sortPaginateProductsUrlSuffix += sortPaginateProductsUrlSuffix === "" ? `?sortBy=byPrice&orderBy=${sortOrder}` :`&sortBy=byPrice&orderBy=${sortOrder}`;
  useEffect(() => {
    fetchTotalProductCount();
    dispatch(productsActions.fetchAll(`${sortPaginateProductsUrlSuffix}`));
  }, [searchKeyword, page, order,minPrice,maxPrice, selectCategory]);
  
  const productList: ProductReadDto[] = useSelector(
    (state: AppState) => state.products.items
  );

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
