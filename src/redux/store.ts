import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products/productSlice";
import cartReducer from "./slices/cartSlice";
import filterSortReducer from "../features/shared/filterSortSlice";
import themeReducer from "./slices/themeSlice";
import { useDispatch } from "react-redux";
import { categoriesReducer } from "../features/categories/categorySlice";
import { usersReducer } from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    cart: cartReducer,
    filterSort: filterSortReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

// import productReducer from "../features/products/productSlice";
// import userReducer from "./slices/userSlice";
// import productQueries from "./productQuery";
// import categoryReducer from "./slices/categorySlice";
// import cartReducer from "./slices/cartSlice";
// import themeReducer from "./slices/themeSlice";
// import filterSortReducer from "../features/shared/filterSortSlice"

// // store all states
// const store = configureStore({
//   reducer: {
//     //products reducer
//     products: productReducer,
//     //category reducer
//     categories: categoryReducer,
//     //user reducer
//     users: userReducer,
//     //cart reducer
//     cart: cartReducer,
//     //filtet&sort
//     filterSort: filterSortReducer,
//     // query
//     // [productQueries.reducerPath]: productQueries.reducer,
//     // theme
//     theme: themeReducer,
//   },

//   // middleware
//   // middleware: (getDefaultMiddleware) =>
//   //   getDefaultMiddleware().concat(productQueries.middleware),
// });


// // save user state in local storage

store.subscribe(() => {
  const currentState = store.getState();
  const userInformation = currentState.users.userLoggedIn;
  const productsInCart = currentState.cart.productsInCart;
  const token = currentState.users.token;
  // const wishlist = currentState.products.wishList;
  // store user
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  localStorage.setItem("token", JSON.stringify(token));
  // localStorage.setItem("wishlist", JSON.stringify(wishlist));
});

export const createNewStore = () => {
  return store;
};
export default store;
