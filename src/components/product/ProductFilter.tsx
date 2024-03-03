import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../../redux/store";
import { CategoryType } from "../../misc/type";

export default function ProductFilters() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const categoryList: CategoryType[] = useSelector(
    (state: AppState) => state.categories.categoryList
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);

  const handleCheckboxChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setMinPrice(value);
    } else {
      alert("Not a valid number");
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setMaxPrice(value);
    } else {
      alert("Not a valid number");
    }
  };
  const navigate = useNavigate();
  const applyFilter = () => {
    let url = "?";
    if (selectedCategoryId !== 0) url += `categoryId=${selectedCategoryId}`;
    if (minPrice !== "") url += `&price_min=${minPrice}`;
    if (maxPrice !== "") url += `&price_max=${maxPrice}`;
    navigate(url);
    setIsFiltersOpen(false);
  };

  return (
    <div className="relative">
      <div className="bg-grey col-12 mt-3 align-middle justify-content-center flex">
        <button
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none"
          type="button"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filters <FilterAltIcon fontSize="small" />
        </button>
      </div>
      {isFiltersOpen && (
        <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow top-full mt-2 left-0 w-96 z-10">
          <div className="col-lg-4 col-xl-3 col-md-6 flex justify-start mt-4 ml-4">
            <article className="filter-group">
              <h6 className="title text-lg text-left font-bold">Category</h6>
              <button
                className="text-left block text-green-500 underline"
                onClick={() => setSelectedCategoryId(0)}
              >
                clear
              </button>
              <div className="filter-content">
                <div className="card-body">
                  {categoryList.map((c) => (
                    <div key={c.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        checked={selectedCategoryId === c.id}
                        onChange={() => handleCheckboxChange(c.id)}
                      />
                      <label className="custom-control-label ml-2">
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <article className="filter-group">
              <h6 className="title text-lg text-left font-bold">Price</h6>
              <button
                className="text-left block text-green-500 underline"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                }}
              >
                clear
              </button>
              <div className="filter-content">
                <div className="flex items-center">
                  <p className="ml-2 mr-1">min</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="border border-gray-300 rounded-md p-2 w-16"
                  />
                </div>
                <div className="flex items-center">
                  <p className="ml-2 mr-1">max</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="border border-gray-300 rounded-md p-2 w-16"
                  />
                </div>
              </div>
            </article>
            <button
              className="self-start ml-2 px-2 py-2 border-green-500 hover:bg-green-400 focus:border-green-500 text-white font-bold rounded mr-4"
              style={{ backgroundColor: "#72BD41" }}
              onClick={applyFilter}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
