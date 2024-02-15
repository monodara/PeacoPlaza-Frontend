// slice: action + reducer

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterValue: 2,
};

// reducer: how change the value of state
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // logic
      // redux tool kit -  make copy
      state.counterValue += 1;
    },

    incrementWithInput: (state, action: PayloadAction<number>) => {
      // logic
      console.log(action, "action");
      state.counterValue += action.payload;
    },
  },
});

const counterReducer = counterSlice.reducer;

export const { increment, incrementWithInput } = counterSlice.actions;
// actions: use in component:
export default counterReducer;
