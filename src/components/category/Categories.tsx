import React, { useEffect } from "react";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";
import { CategoryType } from "../../misc/type";
import CategoryCard from "./CategoryCard";

export default function CategoryFetchData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  // data
  const categoryList: CategoryType[] = useSelector(
    (state: AppState) => state.categories.categoryList
  );

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-2xl font-bold mb-4 mt-6">Shop by Category</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {categoryList.map((category) => {
          // Filter the category that has a valid image
          // if (category.image.includes("imgur")) {
          return <CategoryCard key={category.id} category={category} />;
          // } else {
          //   return null; // Skip categories without valid images
          // }
        })}
      </div>
    </div>
  );
}
