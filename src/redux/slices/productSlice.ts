import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ProductCreatedType, ProductType } from "../../misc/type";

type InitialState = {
  products: ProductType[];
  wishList: ProductType[];
  searchKeyword: string;
  loading: boolean;
  error?: string;
};
let wishlistState: ProductType[];
const wishlistdata = localStorage.getItem("wishlist");

if (wishlistdata) {
  wishlistState = JSON.parse(wishlistdata);
} else {
  wishlistState = [];
}
const initialState: InitialState = {
  products: [],
  loading: false,
  wishList: wishlistState,
  searchKeyword: "",
};

// const url = "https://api.escuelajs.co/api/v1/products";

// useEffect
export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // If response is not ok, throw an error with the appropriate status text
        throw new Error(`HTTP Error: ${response.statusText}`);
      }
      // If successful, parse the JSON data and return it
      return await response.json();
    } catch (error) {
      // If an error occurs during the fetch operation, handle it here
      throw new Error(`Fetch Error: ${(error as AxiosError).message}`);
    }
  }
);

const url = "https://api.escuelajs.co/api/v1/products/";
export const createProductsAsync = createAsyncThunk(
  "createProductsAsync",
  async (newProduct: ProductCreatedType, { rejectWithValue }) => {
    try {
      const result = await axios.post<ProductType>(url, newProduct);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(e);
    }
  }
);
export const deleteProductsAsync = createAsyncThunk(
  "deleteProductsAsync",
  async (product: ProductType, { rejectWithValue }) => {
    try {
      const result = await axios.delete<ProductType>(url + product.id);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
export const updateProductsAsync = createAsyncThunk(
  "updateProductsAsync",
  async (product: ProductType, { rejectWithValue }) => {
    const { title, price } = product;
    const updatedProd = { title, price };
    try {
      const result = await axios.put<ProductType>(
        url + product.id,
        updatedProd
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
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

    getSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },

    changeTheme: () => {
      // logic
    },
  },
  extraReducers(builder) {
    // async fetch all products
    // 3 states:
    //success
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      // save data in redux
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
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
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    // create a new product
    // 1. success
    builder.addCase(createProductsAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    // 2. loading
    builder.addCase(createProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // 3. error
    builder.addCase(createProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });

    // async delete a product
    // 1. success
    builder.addCase(deleteProductsAsync.fulfilled, (state, action) => {
      // update data in redux
      if (!(action.payload instanceof Error) && action.payload) {
        const index = state.products.findIndex(
          (product) => product.id === action.meta.arg.id
        );
        // If index found, remove the product from the state
        if (index !== -1) {
          state.products.splice(index, 1);
        }
      }
    });
    // 2. loading
    builder.addCase(deleteProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // 3. error
    builder.addCase(deleteProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    // async update a product
    // 1. success
    builder.addCase(updateProductsAsync.fulfilled, (state, action) => {
      // save data in redux
      if (!(action.payload instanceof Error)) {
        const index = state.products.findIndex(
          (product) => product.id === action.meta.arg.id
        );
        // If index found, remove the product from the state
        if (index !== -1) {
          state.products[index] = action.meta.arg;
        }
        return {
          ...state,
          loading: false,
        };
      }
    });
    // 2. loading
    builder.addCase(updateProductsAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // 3. error
    builder.addCase(updateProductsAsync.rejected, (state, action) => {
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
  getSearchKeyword,

  removeFromWishList,
} = productSlice.actions;
export default productReducer;
