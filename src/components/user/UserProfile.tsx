import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { AppState } from "../../redux/store";
import { useTheme } from "../contextAPI/ThemeContext";

export default function UserProfile() {
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const user = useSelector((state: AppState) => state.users.user);

  if (!user) {
    return <div> no user</div>;
  }

  return (
    <div>
      <div
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        style={{ backgroundColor }}
      >
        <div className="border-b px-4 pb-6">
          <div className="text-center mx-10">
            <img
              className="h-auto w-48 rounded-full border-4 border-white mx-auto my-4"
              src={user.avatar}
              alt="user's avatar"
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl mb-1" style={{ color }}>
                {user.name}
              </h3>
              <div className="inline-flex items-center" style={{ color }}>
                {user.email}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col justify-left items-left ml-20">
          <div className="flex gap-2 items-center mb-4" style={{ color }}>
            <ShoppingCartIcon />
            <span>
              <Link to={"/cart"}>My Cart</Link>
            </span>
          </div>
          <div className="flex gap-2 items-center mb-2" style={{ color }}>
            <FavoriteIcon />
            <span>
              <Link to={"/wishlist"}>My Wishlist</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
