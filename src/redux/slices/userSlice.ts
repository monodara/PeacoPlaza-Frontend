import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserType } from "../../misc/type";

let userState: UserType | null = null;
const data = localStorage.getItem("userInformation");

if (data) {
  userState = JSON.parse(data);
}

type InitialState = {
  user: UserType | null;
};
// type InitialState = {
//   token: string;
// };

const initialState: InitialState = {
  user: userState,
};
// const initialState: InitialState = {
//   token: "",
// };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUserInformation: (
      state,
      action: PayloadAction<Omit<UserType, "password" | "id"> | null>
    ) => {
      state.user = action.payload;
    },
  },
});

const userReducer = usersSlice.reducer;
export const { saveUserInformation } = usersSlice.actions;
export default userReducer;
