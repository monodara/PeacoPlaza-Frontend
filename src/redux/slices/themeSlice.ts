import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  mode: "light" | "dark";
};

const initialState: InitialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const themeReducer = themeSlice.reducer;

export const { changeTheme } = themeSlice.actions;
export default themeReducer;
