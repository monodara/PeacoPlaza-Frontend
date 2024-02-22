import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import axios from "axios";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function UserProfile() {
  const [userForm, setUserForm] = useState();

  // get user information
  const user = useSelector((state: AppState) => state.users.user);

  if (!user) {
    return <div> no user</div>;
  }

  return (
    <div>
      <h1>UserProfile</h1>
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={user.avatar}
              alt="user's avatar"
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {user.name}
              </h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                {user.email}
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Change Username
            </button>
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col justify-left items-left ml-28">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <ShoppingCartIcon />
            <span>
              <Link to={"/cart"}>My Cart</Link>
            </span>
          </div>
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-2">
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
