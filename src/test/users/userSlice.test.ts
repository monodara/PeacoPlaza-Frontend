import { UserType } from "../../misc/type";
import { PayloadAction } from "@reduxjs/toolkit";
import userReducer, { saveUserInformation } from "../../redux/slices/userSlice";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as PayloadAction)).toEqual({ user: null });
  });

  it("should handle saveUserInformation", () => {
    const initialState = { user: null };
    const user: UserType = {
      name: "John",
      email: "john@example.com",
      password: "XXXXXXXX",
      avatar: "avatarImg",
      role: "customer",
      id: 100,
    };
    const action: PayloadAction<UserType | null> = saveUserInformation(user);

    const newState = userReducer(initialState, action);

    expect(newState).toEqual({ user });
  });
});
