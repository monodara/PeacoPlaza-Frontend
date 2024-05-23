import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import { AppState, useAppDispatch } from "../../redux/store";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import UserDefaultAvatar from "./defaultAvatar.jpeg";
import { UserReadDto } from "./userDto";
import AvatarUpload from "./AvatarUpload"
import { usersActions } from "./userSlice";

export default function UserProfile() {
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const dispatch = useAppDispatch();


  const handleMouseEnter = () => {
    setShowUploadButton(true);
  };
  const handleMouseLeave = () => {
    setShowUploadButton(false);
  };
    useEffect(()=>{
      dispatch(usersActions.fetchById(user?user.id:""))
  }, [user])

  return (
    <div>
      <div
        className="max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        style={{ backgroundColor }}
      >
        <div className="border-b px-4 pb-6">
          <div
            className="text-center mx-10 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="h-auto w-48 rounded-full border-4 border-white mx-auto my-4 relative">
              <img
                className="h-full w-full rounded-full object-cover"
                src={user && user.avatar ? user.avatar.data : UserDefaultAvatar}
                alt="user's avatar"
              />
              {showUploadButton && (
                <div
                  className="absolute bg-transparent text-green-500 rounded-full px-2 py-1"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <AddIcon sx={{ fontSize: 48 }} />
                 
                </div>
              )}
            </div>
            
            <div className="py-2">
              <h3 className="font-bold text-2xl mb-1" style={{ color }}>
                {user?.userName}
              </h3>
              <div className="inline-flex items-center" style={{ color }}>
                {user?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col justify-left items-left ml-20">
          <div className="flex gap-2 items-center mb-4" style={{ color }}>
            <ShoppingCartIcon />
            <span>
              <Link to="/cart">My Cart</Link>
            </span>
          </div>
          <div className="flex gap-2 items-center mb-2" style={{ color }}>
            <FavoriteIcon />
            <span>
              <Link to="/wishlist">My Wishlist</Link>
            </span>
          </div>
        </div>
      </div>

      <AvatarUpload />
    </div>
  );
}
