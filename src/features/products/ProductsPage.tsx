import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import ProductFilters from "./ProductFilter";
import ProductSort from "./ProductSort";
import Pagination from "./Pagination";
import { useProductList } from "./useProductList";
import ProductList from "./ProductList";

export default function Products() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const { productList, totalPage, page, setPage } = useProductList();

  const sortOrderFromStore: string = useSelector(
    (state: AppState) => state.filterSort.orderBy
  );

  useEffect(() => {
    setSortOrder(sortOrderFromStore);
  }, [sortOrderFromStore]);

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

      <ProductList products={productList} />

      <div className="mt-4 flex justify-center">
        <Pagination count={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
