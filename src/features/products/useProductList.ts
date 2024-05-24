import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { productsActions } from "./productSlice";
import { ProductReadDto } from "./productDto";

export const useProductList = () => {
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
  const [page, setPage] = useState(1);
  const pageSize = 12;

  if (searchKeyword && searchKeyword.trim() !== "") {
    filterProductsUrlSuffix += `?searchKey=${searchKeyword}`;
  }
  if (minPrice !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?minPrice=${minPrice}` : `&minPrice=${minPrice}`;
  if (maxPrice !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?maxPrice=${maxPrice}` : `&maxPrice=${maxPrice}`;
  if (selectCategory !== "") filterProductsUrlSuffix += filterProductsUrlSuffix === "" ? `?categoriseBy=${selectCategory}` : `&categoriseBy=${selectCategory}`;

  async function fetchTotalProductCount() {
    try {
      const response = await dispatch(productsActions.fetchTotalCount({ urlSuffix: `${filterProductsUrlSuffix}` }));
      const data = response.payload as number;
      setTotalPage(Math.ceil(data / pageSize));
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  }

  let sortPaginateProductsUrlSuffix = filterProductsUrlSuffix
  sortPaginateProductsUrlSuffix += sortPaginateProductsUrlSuffix === "" ? `?pageNo=${page}&pageSize=${pageSize}` : `&pageNo=${page}&pageSize=${pageSize}`;
  if (order !== "") sortPaginateProductsUrlSuffix += sortPaginateProductsUrlSuffix === "" ? `?sortBy=byPrice&orderBy=${order}` : `&sortBy=byPrice&orderBy=${order}`;

  useEffect(() => {
    fetchTotalProductCount();
    dispatch(productsActions.fetchAll({ urlSuffix: `${sortPaginateProductsUrlSuffix}` }));
  }, [searchKeyword, page, order, minPrice, maxPrice, selectCategory]);

  const productList: ProductReadDto[] = useSelector(
    (state: AppState) => state.products.items
  );

  return { productList, totalPage, page, setPage };
};
