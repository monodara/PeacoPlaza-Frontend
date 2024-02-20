import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryType } from "../../misc/type";

type InitialState = {
  categories: CategoryType[];
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  categories: [],
  loading: false,
};

// fetch data
const url = "https://api.escuelajs.co/api/v1/categories";

// fetchAllProductsAsync() => async
// useEffect
export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async () => {
    // fetch data: axios/ fetch
    try {
      const jsonData = await fetch(url);
      const data: CategoryType[] = await jsonData.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
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
      // save data in redux
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          categories: action.payload,
          loading: false,
        };
      }
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
      if (action.payload instanceof Error) {
        //logic
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const categoryReducer = categorySlice.reducer;

// export const { addToFav, searchProductByName, getUserInput } =
//   productSlice.actions;
// actions: use in component:
export default categoryReducer;
