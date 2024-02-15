import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./slices/counterSlice";
import productReducer from "./slices/productSlice";
import { useDispatch } from "react-redux";
import userReducer from "./slices/userSlice";
import productQueries from "./productQuery";

// store all states
const store = configureStore({
  reducer: {
    // counterReducer
    counter: counterReducer,
    products: productReducer,
    users: userReducer,
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
  // store user
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
});

export default store;
