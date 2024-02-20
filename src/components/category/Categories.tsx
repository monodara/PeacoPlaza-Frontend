import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";
import { AppState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { CategoryType } from "../../misc/type";
import CategoryCard from "./CategoryCard";

export default function CategoryFetchData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  // data
  const categoryList: CategoryType[] = useSelector(
    (state: AppState) => state.categories.categories
  );

  return (
    <div>
      <Box sx={{ displayPrint: "inline" }}>
        {categoryList.map((category) => {
          //filter the category that has a valid image
          if (category.image.includes("imgur"))
            return <CategoryCard key={category.id} category={category} />;
        })}
      </Box>
    </div>
  );
}
