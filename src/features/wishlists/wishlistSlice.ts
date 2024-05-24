import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ProductReadDto } from "../products/productDto";

export type InitialState = {
  wishList: ProductReadDto[];
};

let wishlistState: ProductReadDto[] = [];

const wishlistdata = localStorage.getItem("wishlist");

if (wishlistdata) {
  try {
    wishlistState = JSON.parse(wishlistdata);
  } catch (error) {
    console.error("Error parsing wishlist data from localStorage", error);
    wishlistState = [];
  }
} else {
  wishlistState = [];
}

const initialState: InitialState = {
  wishList: wishlistState,
};



const wishlistSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    // add to wish list
    addToWishList: (state, action: PayloadAction<ProductReadDto>) => {
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
    removeFromWishList: (state, action: PayloadAction<ProductReadDto>) => {
      const itemToRemove = action.payload;
      // Find the index
      const existingItemIndex = state.wishList.findIndex(
        (item) => item.id === itemToRemove.id
      );
      state.wishList.splice(existingItemIndex, 1);
    },
  },
});

const wishlistReducer = wishlistSlice.reducer;

export const {
  addToWishList,
  removeFromWishList,
} = wishlistSlice.actions;
export default wishlistReducer;