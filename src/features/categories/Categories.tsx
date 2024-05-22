import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

import FurnitureBg from "../../images/furnitureBG.jpg";
import ElecBg from "../../images/electronicsBG.jpeg";
import FootwareBg from "../../images/footwareBG.jpg";
import { useAppDispatch, AppState } from "../../redux/store";
import CategoryCard from "./CategoryCard";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import { CategoryReadDto } from "./categoryDto";
import { setCategoryBy } from "../shared/filterSortSlice";
import { categoriesActions } from "./categorySlice";

export default function Categories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(categoriesActions.fetchAll(""));
  }, [dispatch]);

  const categoryList: CategoryReadDto[] = useSelector(
    (state: AppState) => state.categories.items
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
    <div>
      <div className="container mx-auto px-6 mt-10">
      <div
        className="h-64 rounded-md overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${FurnitureBg})`,
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12 ">
          <div className="max-w-xl">
            <h2 className="text-2xl text-white font-semibold text-left">
              Furniture
            </h2>
            <p className="mt-2 text-gray-400 text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
              facere provident molestias ipsam sint voluptatum pariatur.
            </p>
            <button
              className="flex items-center mt-4 px-3 py-2 bg-green-500 text-white text-sm uppercase font-medium rounded hover:bg-green-400 focus:outline-none focus:bg-green-500"
              onClick={() => {
                dispatch(setCategoryBy(categoryList[2].id))
                navigate("/products");
              }}
            >
              <span>Shop Now</span>
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="md:flex mt-8 md:-mx-4">
        <div
          className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 "
          style={{
            backgroundImage: `url(${ElecBg})`,
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12">
            <div className="max-w-xl">
              <h2 className="text-2xl text-white font-semibold text-left">
                Electronics
              </h2>
              <p className="mt-2 text-gray-400 text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore facere provident molestias ipsam sint voluptatum
                pariatur.
              </p>
              <button
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                onClick={() => {
                  dispatch(setCategoryBy(categoryList[3].id))
                  navigate("/products");
                }}
              >
                <span>Shop Now</span>
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
          style={{
            backgroundImage: `url(${FootwareBg})`,
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 h-full flex flex-col justify-center px-12">
            <div className="max-w-xl">
              <h2 className="text-2xl text-white font-semibold text-left">
                Shoes
              </h2>
              <p className="mt-2 text-gray-400 text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore facere provident molestias ipsam sint voluptatum
                pariatur.
              </p>
              <button
                className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                onClick={() => {
                  dispatch(setCategoryBy(categoryList[3].id))
                  navigate("/products");
                }}
              >
                <span>Shop Now</span>
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    </div></div>
  );
}
