import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryType } from "../../misc/type";
import { CategoryReadDto } from "../../features/categories/categoryDto";
import { categoryEndpoint } from "../../misc/endpoints";

type InitialState = {
  categoryList: CategoryReadDto[];
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  categoryList: [],
  loading: false,
};

// fetch data
const url = categoryEndpoint;

// useEffect
export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async (_, { rejectWithValue }) => {
    // fetch data: axios/ fetch
    try {
      const jsonData = await fetch(url);
      const data: CategoryReadDto[] = await jsonData.json();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // async
    // 3 states:
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      return {
        ...state,
        categoryList: action.payload,
        loading: false,
      };
    });
    // loading
    builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // error
    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      //logic
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
