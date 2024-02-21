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
    removeFromCart: (state, action: PayloadAction<ProductType>) => {
      const itemToRemove = action.payload;
      // Find the index
      const existingItemIndex = state.productsInCart.findIndex(
        (item) => item.id === itemToRemove.id
      );
      state.productsInCart.splice(existingItemIndex, 1);
    },
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
  addToCart,
  incrementProductAmount,
  decrementProductAmount,
  removeFromCart,
} = productSlice.actions;
// actions: use in component:
export default productReducer;
