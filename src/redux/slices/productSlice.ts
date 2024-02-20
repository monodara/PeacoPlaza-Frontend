import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductType } from "../../misc/type";

type InitialState = {
  products: ProductType[];
  wishList: ProductType[];
  userInput: string;
  loading: boolean;
  error?: string;
  productsInCart: ProductType[];
};

const initialState: InitialState = {
  products: [],
  loading: false,
  wishList: [],
  userInput: "",
  productsInCart: [],
};

// const url = "https://api.escuelajs.co/api/v1/products";

// useEffect
export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async (url: string) => {
    try {
      const jsonData = await fetch(url);
      const data: ProductType[] = await jsonData.json();
      return data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // add to fav list
    addToWishList: (state, action: PayloadAction<ProductType>) => {
      // state: {products, favList}
      // logic
      // write logic to not allow user to add same product tp fav list
      state.wishList.push(action.payload);
    },

    getUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    // add new action for remove product from productList
    // add new action for remove product from favList

    changeTheme: () => {
      // logic
    },
  },
  extraReducers(builder) {
    // async
    // 3 states:
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      // save data in redux
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      }
    });
    // loading
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // error
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
  },
});

const productReducer = productSlice.reducer;

export const { addToWishList, getUserInput } = productSlice.actions;
// actions: use in component:
export default productReducer;
