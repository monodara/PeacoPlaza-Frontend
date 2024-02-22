// slice: action + reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProductType, ProductType } from "../../misc/type";

type InitialState = {
  productsInCart: CartProductType[];
  drawerOpen: boolean;
};
let productsInCartState: CartProductType[];
const cartdata = localStorage.getItem("productsInCart");

if (cartdata) {
  productsInCartState = JSON.parse(cartdata);
} else {
  productsInCartState = [];
}
const initialState: InitialState = {
  productsInCart: productsInCartState,
  drawerOpen: false,
};

// reducer: how change the value of state
const cartSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openRightDrawer: (state) => {
      // logic
      // redux tool kit -  make copy
      state.drawerOpen = true;
    },
    closeRightDrawer: (state) => {
      // logic
      // redux tool kit -  make copy
      state.drawerOpen = false;
    },
    //add a product to cart
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const itemToAdd = action.payload;
      // Check if the item is already in the cart
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === itemToAdd.id
      );
      if (existingItemIndex !== -1) {
        // Get current amount
        const currentAmount = state.productsInCart[existingItemIndex].amount;
        // Update amount
        state.productsInCart[existingItemIndex] = {
          ...itemToAdd,
          amount: currentAmount + 1,
        };
      } else {
        // Item is not in the cart, add it with quantity 1
        state.productsInCart.push({ ...itemToAdd, amount: 1 });
      }
    },
    incrementProductAmount: (state, action: PayloadAction<CartProductType>) => {
      const itemToAdd = action.payload;
      // Check if the item is already in the cart
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === itemToAdd.id
      );
      // Item is already in the cart, update its quantity
      // Get current amount
      const currentAmount = state.productsInCart[existingItemIndex].amount;
      // Update amount
      state.productsInCart[existingItemIndex] = {
        ...itemToAdd,
        amount: currentAmount + 1,
      };
    },
    decrementProductAmount: (state, action: PayloadAction<CartProductType>) => {
      const itemToReduce = action.payload;
      // Check if the item is already in the cart
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === itemToReduce.id
      );
      // There are more than one item in the cart
      // Get current amount
      const currentAmount = state.productsInCart[existingItemIndex].amount;
      // Update amount
      state.productsInCart[existingItemIndex] = {
        ...itemToReduce,
        amount: currentAmount - 1,
      };
    },
    removeFromCart: (state, action: PayloadAction<CartProductType>) => {
      const itemToRemove = action.payload;
      // Find the index
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === itemToRemove.id
      );
      state.productsInCart.splice(existingItemIndex, 1);
    },
    updateProductAmount: (
      state,
      action: PayloadAction<{ product: CartProductType; newAmount: number }>
    ) => {
      const { product, newAmount } = action.payload;
      // Find the index
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === product.id
      );
      state.productsInCart[existingItemIndex] = {
        ...product,
        amount: newAmount,
      };
    },
  },
});

const cartReducer = cartSlice.reducer;

export const {
  openRightDrawer,
  closeRightDrawer,
  addToCart,
  incrementProductAmount,
  decrementProductAmount,
  removeFromCart,
  updateProductAmount,
} = cartSlice.actions;
export default cartReducer;
