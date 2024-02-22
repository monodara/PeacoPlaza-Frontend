import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CartProductType, ProductType } from "../../misc/type";

type InitialState = {
  products: ProductType[];
  wishList: ProductType[];
  userInput: string;
  loading: boolean;
  error?: string;
  productsInCart: CartProductType[];
};
let productsInCartState: CartProductType[];
let wishlistState: ProductType[];
const cartdata = localStorage.getItem("productsInCart");
const wishlistdata = localStorage.getItem("wishlist");

if (cartdata) {
  productsInCartState = JSON.parse(cartdata);
} else {
  productsInCartState = [];
}
if (wishlistdata) {
  wishlistState = JSON.parse(wishlistdata);
} else {
  wishlistState = [];
}
const initialState: InitialState = {
  products: [],
  loading: false,
  wishList: wishlistState,
  userInput: "",
  productsInCart: productsInCartState,
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
    // add to wish list
    addToWishList: (state, action: PayloadAction<ProductType>) => {
      const itemToAdd = action.payload;
      // Check if the item is already in the list
      const existingItemIndex = state.wishList.findIndex(
        (item) => item.id === itemToAdd.id
      );
      // If it's not in the list, add it to the list
      if (existingItemIndex === -1) {
        state.wishList.push(itemToAdd);
      }
    },
    removeFromWishList: (state, action: PayloadAction<ProductType>) => {
      const itemToRemove = action.payload;
      // Find the index
      const existingItemIndex = state.wishList.findIndex(
        (item) => item.id === itemToRemove.id
      );
      state.wishList.splice(existingItemIndex, 1);
    },

    getUserInput: (state, action) => {
      state.userInput = action.payload;
    },
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

export const {
  addToWishList,
  getUserInput,

  removeFromWishList,
} = productSlice.actions;
export default productReducer;
