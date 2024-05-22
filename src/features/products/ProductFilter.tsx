import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState, useAppDispatch } from "../../redux/store";
import { CategoryType } from "../../misc/type";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import { CategoryReadDto } from "../categories/categoryDto";
import { setCategoryBy, setInputToSearchKey, setPriceLowBoundary, setPriceUpBoundary } from "../shared/filterSortSlice";

function ProductFilters() {
  const dispatch = useAppDispatch();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const categoryList: CategoryReadDto[] = useSelector(
    (state: AppState) => state.categories.items
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    dispatch(setCategoryBy(categoryId));
  };

  const debouncedMinPriceChange = debounce((value: string) => {
    if (!isNaN(Number(value))) {
      setMinPrice(value);
      dispatch(setPriceLowBoundary(value));
    }
  }, 200);

  const debouncedMaxPriceChange = debounce((value: string) => {
    if (!isNaN(Number(value))) {
      setMaxPrice(value);
      dispatch(setPriceUpBoundary(value));
    }
  }, 20);

  const applyFilter = () => {
    dispatch(setPriceLowBoundary(minPrice));
    dispatch(setPriceUpBoundary(maxPrice));
    dispatch(setCategoryBy(selectedCategoryId));
    dispatch(setInputToSearchKey(""));
    setIsFiltersOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsFiltersOpen, dropdownRef]);
  const { theme } = useTheme();
  return (
    <div className="relative">
      {isFiltersOpen && (
        <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow top-full mt-2 left-0 w-120 z-10">
          <div className="col-lg-4 col-xl-3 col-md-6 flex justify-start mt-4 ml-4">
            {/* Category Filter */}
            <FilterOption
              title="Category"
              options={categoryList}
              selectedValue={selectedCategoryId}
              onChange={handleCheckboxChange}
            />
            {/* Price Filter */}
            <FilterOption
              title="Price"
              minPlaceholder="Min"
              maxPlaceholder="Max"
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinChange={(e) => debouncedMinPriceChange(e.target.value)}
              onMaxChange={(e) => debouncedMaxPriceChange(e.target.value)}
            />
            {/* Apply Button */}
            <button
              className="self-start ml-2 px-2 py-2 font-bold rounded mr-4"
              style={theme.typography.button}
              onClick={applyFilter}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      <div className="col-12 mt-3 align-middle justify-content-center flex">
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center border border-gray-300 rounded-s-lg focus:outline-none"
          type="button"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          style={theme.typography.button}
        >
          Filters <FilterAltIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

interface FilterOptionProps {
  title: string;
  options?: CategoryReadDto[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  minPrice?: string;
  maxPrice?: string;
  onMinChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterOption({
  title,
  options,
  selectedValue,
  onChange,
  minPlaceholder,
  maxPlaceholder,
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: FilterOptionProps) {
  const clearFilter = () => {
    if (title === "Category") {
      onChange && onChange("");
    } else {
      onMinChange && onMinChange({ target: { value: "" } } as any);
      onMaxChange && onMaxChange({ target: { value: "" } } as any);
    }
  };
  return (
    <article className="filter-group">
      <h6 className="title text-lg text-left font-bold">{title}</h6>
      <button
        className="text-left block text-green-500 underline"
        onClick={clearFilter}
      >
        clear
      </button>
      <div className="filter-content">
        {title === "Category" ? (
          <div className="card-body">
            {options?.map((c) => (
              <div key={c.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={selectedValue === c.id}
                  onChange={() => onChange && onChange(c.id)}
                />
                <label className="custom-control-label ml-2">{c.name}</label>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-body">
            <div className="flex items-center">
              <p className="ml-2 mr-1">min</p>
              <input
                type="text"
                value={minPrice}
                onChange={onMinChange}
                className="border border-gray-300 rounded-md p-2 w-16"
                placeholder={minPlaceholder}
              />
              <p className="ml-2 mr-1">max</p>
              <input
                type="text"
                value={maxPrice}
                onChange={onMaxChange}
                className="border border-gray-300 rounded-md p-2 w-16"
                placeholder={maxPlaceholder}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductFilters;
