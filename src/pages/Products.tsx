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
import { getAllProductsUrl } from "../misc/endpoints";

export default function Products() {
  const dispatch = useAppDispatch();

  let url = getAllProductsUrl;
  console.log(url);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  if (categoryId) url += `&categoryId=${categoryId}`;
  const minPrice = searchParams.get("price_min") || "";
  if (minPrice) url += `&price_min=${minPrice}`;
  const maxPrice = searchParams.get("price_max") || "";
  if (maxPrice) url += `&price_max=${maxPrice}`;

  useEffect(() => {
    dispatch(fetchAllProductsAsync(url));
  }, [dispatch, url]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]); // <-- Add this line
  const dropdownRef = useRef<HTMLDivElement>(null);

  const productList: ProductType[] = useSelector(
    (state: AppState) => state.products.products
  );
  const searchKeyword: string = useSelector(
    (state: AppState) => state.products.searchKeyword
  );
  const filteredProducts = productList.filter((p) =>
    p.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    const newSortedProducts = sortProducts(filteredProducts, sortOrder);
    if (JSON.stringify(newSortedProducts) !== JSON.stringify(sortedProducts)) {
      setSortedProducts(newSortedProducts);
    }
  }, [filteredProducts, sortOrder, sortedProducts]);

  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

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
      {filteredProducts.length === 0 && (
        <div className="mt-10 text-center">
          No such product. Maybe try again.
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 my-auto">
        <ProductPagination count={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
