// slice: action + reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    // incrementWithInput: (state, action: PayloadAction<number>) => {
    //   // logic
    //   console.log(action, "action");
    //   state.counterValue += action.payload;
    // },
  },
});

const cartReducer = cartSlice.reducer;

export const { openRightDrawer, closeRightDrawer } = cartSlice.actions;
// actions: use in component:
export default cartReducer;
