import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserReadDto, UserCreateDto, UserUpdateDto } from "./userDto";
import createBaseSlice, { BaseState } from "../../app/BaseSlice";
import appAxios from "../shared/appAxios";

// Get user info and token from localStorage
let userState: UserReadDto | null = null;
const data = localStorage.getItem("userInformation");
const token = localStorage.getItem("token");

if (data) {
  userState = JSON.parse(data);
}

type InitialState = BaseState<UserReadDto> & {
  userLoggedIn: UserReadDto | null;
  token: string | null;
};

// Get BaseSlice initial state
const baseInitialState: BaseState<UserReadDto> = {
  items: [],
  loading: false,
};

// Extend BaseSlice's initial state, adding userLoggedIn and token properties
const initialState: InitialState = {
  ...baseInitialState,
  userLoggedIn: userState,
  token,
};

// Define additional actions
const fetchUserByUsername = createAsyncThunk<UserReadDto, string>(
  "users/fetchUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await appAxios.get(`/users/username/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

const resetPassword = createAsyncThunk<boolean, { id: string; newPassword: string }>(
  "users/resetPassword",
  async ({ id, newPassword }, { rejectWithValue }) => {
    try {
      const response = await appAxios.post(`/users/reset-password/${id}`, { newPassword }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

// Use base slice to create user slice
const { slice: baseSlice, actions: baseActions, extraReducers: baseExtraReducers } = createBaseSlice<UserReadDto, UserCreateDto, UserUpdateDto>("users", "/users");

// Extend slice
const userSlice = createSlice({
  name: baseSlice.name,
  initialState,
  reducers: {
    // ...baseSlice.reducers,
    setUser(state, action: PayloadAction<UserReadDto | null>) {
      state.userLoggedIn = action.payload;
      localStorage.setItem("userInformation", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.userLoggedIn = null;
      state.token = null;
      localStorage.removeItem("userInformation");
      localStorage.removeItem("token");
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    baseExtraReducers(builder);

    // fetchUserByUsername
    builder.addCase(fetchUserByUsername.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.selectedItem = action.payload;
    });
    builder.addCase(fetchUserByUsername.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUserByUsername.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // resetPassword action
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export reducer and actions
export const usersReducer = userSlice.reducer;
export const usersActions = {
  ...baseActions,
  fetchUserByUsername,
  resetPassword,
  setUser: userSlice.actions.setUser,
  clearUser: userSlice.actions.clearUser,
  setToken: userSlice.actions.setToken,
  clearToken: userSlice.actions.clearToken,
};





// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { UserType } from "../../misc/type";

// let userState: UserType | null = null;
// const data = localStorage.getItem("userInformation");

// if (data) {
//   userState = JSON.parse(data);
// }

// type InitialState = {
//   user: UserType | null;
// };
// // type InitialState = {
// //   token: string;
// // };

// const initialState: InitialState = {
//   user: userState,
// };
// // const initialState: InitialState = {
// //   token: "",
// // };

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     saveUserInformation: (
//       state,
//       action: PayloadAction<Omit<UserType, "password" | "id"> | null>
//     ) => {
//       state.user = action.payload;
//     },
//   },
// });

// const userReducer = usersSlice.reducer;
// export const { saveUserInformation } = usersSlice.actions;
// export default userReducer;
