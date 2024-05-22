import React, { useEffect, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import { useAppDispatch } from "../../redux/store";
import { setOrderBy } from "../shared/filterSortSlice";

interface ProductSortProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
  isDropdownOpen: boolean;
}

const ProductSort: React.FC<ProductSortProps> = ({
  sortOrder,
  setSortOrder,
  setIsDropdownOpen,
  isDropdownOpen,
}) => {
  const dispatch = useAppDispatch();

  const handleSort = (order: string) => {
    if(order == "None") order = "";
    setSortOrder(order);
    dispatch(setOrderBy(order));
    setIsDropdownOpen(false);
  };
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
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
        type="button"
        style={theme.typography.button}
      >
        Sort By Price: {sortOrder}
        <ArrowDropDownIcon />
      </button>
      <div
        className={`${
          isDropdownOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 mt-2 w-48 z-10`}
      >
        <ul className="py-2 text-sm text-gray-700">
          <li>
            <button
              onClick={() => handleSort("None")}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              None
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSort("Ascending")}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Ascending
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSort("Descending")}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Descending
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSort;
