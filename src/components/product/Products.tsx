import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchAllProductsAsync(url));
  }, [url]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
  const [sortOrder, setSortOrder] = useState("");

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

  return (
    <div className="container mx-auto px-4">
      {filteredProducts.length === 0 && (
        <div className="mt-10 text-center">
          No such product. Maybe try again.
        </div>
      )}

      <div className="relative flex justify-end mt-10">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
          type="button"
          style={{ paddingRight: "30px" }} // Adjust the paddingRight to make room for the arrow
        >
          Sort By Price: {sortOrder}
          <svg
            className="w-2.5 h-2.5 absolute top-1/2 right-4 transform -translate-y-1/2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          className={`${
            isDropdownOpen ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-12 right-0 w-48 z-10`}
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
