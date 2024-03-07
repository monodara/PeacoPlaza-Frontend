import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { saveUserInformation } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iconStyle } from "../../misc/style";
import { useTheme } from "../contextAPI/ThemeContext";

export default function UserLogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const primaryColor = theme.palette.primary.main;
  const hoverColor = theme.palette.secondary.main;

  const [logoutFlag, setLogoutFlag] = useState(false);

  const logout = () => {
    dispatch(saveUserInformation(null));
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("wishlist");
    localStorage.clear();
    navigate("/");
    setLogoutFlag(true);
  };
  return (
    <div>
      <LogoutOutlinedIcon
        className={iconStyle}
        onClick={logout}
        style={{
          color: isHovered ? hoverColor : primaryColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
}
