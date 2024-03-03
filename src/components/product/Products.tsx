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
    console.log(url);
    dispatch(fetchAllProductsAsync(url));
  }, [url]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [sortOrder, setSortOrder] = useState("");
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

  function sortByPrice(sortOrder: string) {
    setIsDropdownOpen(false);
    let newSortedProducts: ProductType[] = [...filteredProducts];
    if (sortOrder === "Ascending") {
      newSortedProducts.sort((a, b) => a.price - b.price);
      setSortOrder("Ascending");
    } else if (sortOrder === "Descending") {
      newSortedProducts.sort((a, b) => b.price - a.price);
      setSortOrder("Descending");
    } else {
      setSortOrder("");
    }
    setSortedProducts(newSortedProducts);
  }

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
                  onClick={() => sortByPrice("None")}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  None
                </button>
              </li>
              <li>
                <button
                  onClick={() => sortByPrice("Ascending")}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Ascending
                </button>
              </li>
              <li>
                <button
                  onClick={() => sortByPrice("Descending")}
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
        {sortedProducts.length > 0
          ? sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
