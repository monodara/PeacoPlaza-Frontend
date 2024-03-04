import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { CategoryType } from "../../misc/type";
import { useDispatch } from "react-redux";
import { getSearchKeyword } from "../../redux/slices/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";

function SearchForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | CategoryType>(
    null
  );
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const categoryList = useSelector(
    (state: AppState) => state.categories.categoryList
  );
  function dropdownClickHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: CategoryType | null
  ) {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  }

  return (
    <div className="container mx-auto px-6 mt-10">
      <form className="max-w-lg mx-auto flex flex-col sm:flex-row items-start sm:items-center">
        <div className="relative">
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
            type="button"
          >
            {selectedCategory ? selectedCategory.name : "All Categories"}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
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
            id="dropdown"
            className={`z-10 ${
              isDropdownOpen ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-1 left-0 w-48`}
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => {
                    dropdownClickHandler(e, null);
                  }}
                >
                  All
                </button>
              </li>
              {categoryList.map((c) => {
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                      onClick={(e) => {
                        dropdownClickHandler(e, c);
                      }}
                    >
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="relative flex-grow sm:ml-2 w-full sm:w-auto">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none"
            placeholder="Search..."
            required
            onChange={(e) => {
              dispatch(getSearchKeyword(e.target.value));
            }}
          />
          <Link
            to={
              selectedCategory
                ? `products/?categoryId=${selectedCategory?.id}`
                : "products"
            }
          >
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-e-lg border border-green-500"
              style={{ backgroundColor: "#72BD41" }}
            >
              <SearchIcon />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
