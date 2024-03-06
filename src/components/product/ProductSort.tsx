import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  const handleSort = (order: string) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
        type="button"
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
