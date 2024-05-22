import {createSlice } from "@reduxjs/toolkit";

type InitialState = {
    searchKeyword: string,
    minPrice: string,
    maxPrice: string,
    sortBy: string,
    orderBy: string,
    byCategory: string,
};

const initialState: InitialState = {
    searchKeyword: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "byTitle",
    orderBy: "",
    byCategory: "",
};


const filterSortSlice = createSlice({
  name: "filterSort",
  initialState,
  reducers: {
    // add to wish list
    setInputToSearchKey: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setPriceLowBoundary: (state, action) => {
      state.minPrice = action.payload;
    },
    setPriceUpBoundary: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setCategoryBy : (state, action) => {
      state.byCategory = action.payload;
    },
    resetFilter : (state)=>{
      state.byCategory = "";
      state.maxPrice = "";
      state.minPrice = "";
      state.orderBy="";
      state.searchKeyword = "";
      state.sortBy="";
    }
  },
  
});

const filterSortReducer = filterSortSlice.reducer;
export const {
  setInputToSearchKey,setPriceLowBoundary,setPriceUpBoundary,setCategoryBy,setSortBy,setOrderBy,resetFilter
} = filterSortSlice.actions;
export default filterSortReducer;
