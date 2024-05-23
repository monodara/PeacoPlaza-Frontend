import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosRequestConfig } from "axios";
import { UserReadDto, UserCreateDto, UserUpdateDto } from "./userDto";
import createBaseSlice, { BaseState } from "../../app/BaseSlice";
import appAxios from "../shared/appAxios";

// Get user info and token from localStorage
let userState: UserReadDto | null = null;
const data = localStorage.getItem("userInformation");

if (data) {
  userState = JSON.parse(data);
}

type InitialState = BaseState<UserReadDto> & {
  userLoggedIn: UserReadDto | null;
};

// Get BaseSlice initial state
const baseInitialState: BaseState<UserReadDto> = {
  items: [],
  loading: false,
};

// Extend BaseSlice's initial state, adding userLoggedIn and  properties
const initialState: InitialState = {
  ...baseInitialState,
  userLoggedIn: userState,
};

// Define additional actions
const fetchUserByUsername = createAsyncThunk<UserReadDto, {username: string; headers?: AxiosRequestConfig["headers"];}>(
  "users/fetchUserByUsername",
  async ({username, headers}, { rejectWithValue }) => {
    try {
      const response = await appAxios.get(`/users/username/${username}`, {
        headers },);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);
const uploadAvatar = createAsyncThunk<UserReadDto,
    {
      data: FormData;
      headers?: AxiosRequestConfig["headers"];
    }>(
  "users/upload-avatar",
  async ({ data, headers }, { rejectWithValue }) => {
    try {
      const response = await appAxios.post(`/users/upload-avatar`, data, {headers});
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

const changePassword = createAsyncThunk<boolean, { id: string; newPassword: string; headers?: AxiosRequestConfig["headers"]; }>(
  "users/changePassword",
  async ({ id, newPassword, headers }, { rejectWithValue }) => {
    try {
      const response = await appAxios.post(`/users/change_password/${id}`, { newPassword }, {
        headers
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
      state.items = [];
      localStorage.removeItem("userInformation");
      localStorage.removeItem("token");
    },
    clearToken(state) {
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

    // changePassword action
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // upload avatar
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.selectedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          // Replace the item in the items array
          state.items[index] = action.payload;
        }
      });
    builder.addCase(uploadAvatar.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
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
  changePassword,
  uploadAvatar,
  setUser: userSlice.actions.setUser,
  clearUser: userSlice.actions.clearUser,
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
