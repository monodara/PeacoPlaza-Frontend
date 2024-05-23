import { UserReadDto } from "../../features/users/userDto";
import { usersActions, usersReducer } from "../../features/users/userSlice";
import { UserType } from "../../misc/type";
import { PayloadAction } from "@reduxjs/toolkit";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(usersReducer(undefined, {} as PayloadAction)).toEqual({ user: null });
  });

  it("should handle saveUserInformation", () => {
    const initialState = { items :[], loading: true, userLoggedIn: null,token:"" };
    const user: UserReadDto = {
      userName: "John",
      email: "john@example.com",
      defaultAddressId:"",
      // avatar: "avatarImg",
      role: "Customer",
      id: "100",
    };
    const action: PayloadAction<UserReadDto | null> = usersActions.setUser(user);

    const newState = usersReducer(initialState, action);

    expect(newState).toEqual({ user });
  });
});
