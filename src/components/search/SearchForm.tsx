import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { AppState, useAppDispatch } from "../../redux/store";
import { CategoryType } from "../../misc/type";
import { getSearchKeyword } from "../../redux/slices/productSlice";
import { fetchAllCategoriesAsync } from "../../redux/slices/categorySlice";
import { useTheme } from "../contextAPI/ThemeContext";
import { CategoryReadDto } from "../../features/categories/categoryDto";
import { setCategoryBy, setInputToSearchKey } from "../../features/shared/filterSortSlice";

function SearchForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | CategoryReadDto>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const categoryList = useSelector((state: AppState) => state.categories.categoryList);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setInputToSearchKey(searchKeyword));
    dispatch(setCategoryBy(selectedCategory ? selectedCategory.id : ""));
    setSearchKeyword("");
    setSelectedCategory(null);
    navigate("products");
  };

  function dropdownClickHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: CategoryReadDto | null
  ) {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  }
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsDropdownOpen, dropdownRef]);

  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  return (
    <div className="container mx-auto px-6 mt-10">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row items-start sm:items-center">
        {/* Dropdown */}
        <div className="relative">
          {/* Dropdown button */}
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border rounded-s-lg hover:bg-gray-200 focus:outline-none"
            type="button"
            style={theme.typography.body1}
          >
            {selectedCategory ? selectedCategory.name : "All Categories"}
            <KeyboardArrowDownIcon />
          </button>
          {/* Dropdown content */}
          <div
            id="dropdown"
            className={`z-10 ${isDropdownOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow absolute mt-1 left-0 w-48`}
          >
            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
              {/* Dropdown items */}
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
              {categoryList.map((c) => (
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
              ))}
            </ul>
          </div>
        </div>
        {/* Search input */}
        <div className="relative flex-grow sm:ml-2 w-full sm:w-auto">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleInputChange}
          />
          {/* Search button */}
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-e-lg border border-green-500"
            style={theme.typography.button}
          >
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
