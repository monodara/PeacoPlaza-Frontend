import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import { useDispatch } from "react-redux";
import userReducer from "./slices/userSlice";
import productQueries from "./productQuery";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";

// store all states
const store = configureStore({
  reducer: {
    //products reducer
    products: productReducer,
    //category reducer
    categories: categoryReducer,
    //user reducer
    users: userReducer,
    //cart reducer
    cart: cartReducer,
    // query
    [productQueries.reducerPath]: productQueries.reducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productQueries.middleware),
});
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

// save user state in local storage

store.subscribe(() => {
  const currentState = store.getState();
  const userInformation = currentState.users.user;
  const productsInCart = currentState.cart.productsInCart;
  const wishlist = currentState.products.wishList;
  // store user
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});

export default store;
