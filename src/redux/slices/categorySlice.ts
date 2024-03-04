import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryType } from "../../misc/type";

type InitialState = {
  categoryList: CategoryType[];
  loading: boolean;
  error?: string;
};

const initialState: InitialState = {
  categoryList: [],
  loading: false,
};

// fetch data
const url = "https://api.escuelajs.co/api/v1/categories";

// fetchAllProductsAsync() => async
// useEffect
export const fetchAllCategoriesAsync = createAsyncThunk(
  "fetchAllCategoriesAsync",
  async (_, { rejectWithValue }) => {
    // fetch data: axios/ fetch
    try {
      const jsonData = await fetch(url);
      const data: CategoryType[] = await jsonData.json();
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
      // save data in redux
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

// export const { addToFav, searchProductByName, getUserInput } =
//   productSlice.actions;
// actions: use in component:
export default categoryReducer;
