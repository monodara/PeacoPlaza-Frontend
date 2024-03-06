import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ProductCard from "./ProductCard";
import { ProductType } from "../../misc/type";
import { AppState, useAppDispatch } from "../../redux/store";
import { fetchAllProductsAsync } from "../../redux/slices/productSlice";
import ProductFilters from "./ProductFilter";
import ProductPagination from "./ProductPagination";

export default function ProductsFetchData() {
  const dispatch = useAppDispatch();
  let url = "https://api.escuelajs.co/api/v1/products/?";
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  if (categoryId) url += `&categoryId=${categoryId}`;
  const minPrice = searchParams.get("price_min") || "";
  if (minPrice) url += `&price_min=${minPrice}`;
  const maxPrice = searchParams.get("price_max") || "";
  if (maxPrice) url += `&price_max=${maxPrice}`;

  useEffect(() => {
    dispatch(fetchAllProductsAsync(url));
  }, [url]);

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

  const sortProducts = (
    products: ProductType[],
    order: string
  ): ProductType[] => {
    let newSortedProducts: ProductType[] = [...products];
    if (order === "Ascending") {
      newSortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "Descending") {
      newSortedProducts.sort((a, b) => b.price - a.price);
    }
    return newSortedProducts;
  };

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
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <ProductFilters />
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
            type="button"
          >
            Sort By Price: {sortOrder}
            <ArrowDropDownIcon />
          </button>
          <div
            ref={dropdownRef}
            className={`${
              isDropdownOpen ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 mt-2 w-48 z-10`}
          >
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <button
                  onClick={() => {
                    setSortOrder("None");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  None
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSortOrder("Ascending");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Ascending
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSortOrder("Descending");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Descending
                </button>
              </li>
            </ul>
          </div>
        </div>
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
