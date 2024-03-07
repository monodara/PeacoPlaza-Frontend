import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch, AppState } from "../../redux/store";
import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";
import { CategoryType } from "../../misc/type";
import CategoryCard from "./CategoryCard";
import { useTheme } from "../contextAPI/ThemeContext";

export default function Categories() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const categoryList: CategoryType[] = useSelector(
    (state: AppState) => state.categories.categoryList
  );
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  if (!categoryList) {
    return <div>Loading...</div>;
  }

  if (categoryList.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h3
        className="text-2xl font-bold mb-4 mt-6"
        style={{ color: textPrimaryColor }}
      >
        Shop by Category
      </h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {categoryList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
