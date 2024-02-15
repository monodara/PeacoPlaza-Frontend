import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductType } from "../../misc/type";

type InitialState = {
  products: ProductType[];
  favList: ProductType[];
  userInput: string;
  loading: boolean;
  error?: string;
  // filteredProducts: Product[];
};

const initialState: InitialState = {
  products: [],
  loading: false,
  favList: [],
  userInput: "",
  // filteredProducts: [],
};

// fetch data
const url = "https://api.escuelajs.co/api/v1/products";

// fetchAllProductsAsync() => async
// useEffect
export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async () => {
    // fetch data: axios/ fetch
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
    addToFav: (state, action: PayloadAction<ProductType>) => {
      // state: {products, favList}
      // logic
      // write logic to not allow user to add same product tp fav list
      state.favList.push(action.payload);
    },

    getUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    // add new action for remove product from productList
    // add new action for remove product from favList

    // searching logic here
    searchProductByName: (state, action: PayloadAction<string>) => {
      // logic
      // products: state.products
      // userInput: action.payload
      console.log(action.payload, "payload");
      const result = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      // state.products = result;
      // state.filteredProducts = result;
      // current: state.products: [{test}]
      // state.product=[{test}]
      // [{test}]
      // userInput: product

      // way2
      // state.products.filter(
      //   (product) => product.name.toLowerCase() === action.payload.toLowerCase()
      // );
    },
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
          // [] => [{},{}]
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

const productReducer = productSlice.reducer;

export const { addToFav, searchProductByName, getUserInput } =
  productSlice.actions;
// actions: use in component:
export default productReducer;
