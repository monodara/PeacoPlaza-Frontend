import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import logo from "../../images/logo.png";
import { AppState } from "../../redux/store";
import { CartProductType } from "../../misc/type";
import ListIcon from "@mui/icons-material/List";
import { openRightDrawer } from "../../redux/slices/cartSlice";
import { saveUserInformation } from "../../redux/slices/userSlice";
import { CartDrawer } from "../cart/CartDrawer";

const linkStyle =
  "block md:inline-block text-green-900 hover:text-green-500 px-3 py-3 border-b-2 border-green-900 md:border-none";
const iconStyle =
  "h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const wishlist = useSelector((state: AppState) => state.products.wishList);
  const productsInCart = useSelector(
    (state: AppState) => state.cart.productsInCart
  );
  const user = useSelector((state: AppState) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openDrawer = () => {
    dispatch(openRightDrawer());
  };

  const logout = () => {
    dispatch(saveUserInformation(null));
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("wishlist");
    localStorage.clear();
    navigate("/");
  };

  const totalCartItems = useMemo(
    () =>
      productsInCart.reduce(
        (sum, item: CartProductType) => sum + item.amount,
        0
      ),
    [productsInCart]
  );

  const renderMenuLinks = () => (
    <div
      className={`toggle ${
        isMenuOpen ? "" : "hidden"
      } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-green-900 md:border-none`}
    >
      <Link to="/products" className={linkStyle}>
        All Products
      </Link>
      <Link to="/categories" className={linkStyle}>
        By Category
      </Link>
      {user && user.role === "admin" && (
        <Link to="/admin" className={linkStyle}>
          Admin
        </Link>
      )}
    </div>
  );

  const renderIcons = () => (
    <div
      className={`toggle ${
        isMenuOpen ? "" : "hidden"
      } md:flex items-center justify-end w-full md:w-auto`}
    >
      <div className="flex flex-row-reverse mt-6">
        {user && <LogoutOutlinedIcon className={iconStyle} onClick={logout} />}
        <Link to={user ? "./profile" : "./login"}>
          <AccountCircle className={iconStyle} />
        </Link>
        <Badge
          badgeContent={totalCartItems}
          color="error"
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ShoppingCartIcon className={iconStyle} onClick={openDrawer} />
          <CartDrawer />
        </Badge>
        <Badge
          badgeContent={wishlist.length}
          color="error"
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Link to="./wishlist">
            <FavoriteIcon className={iconStyle} />
          </Link>
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 border-b-2 border-gray-100">
      <nav className="flex flex-wrap items-center justify-between p-3 bg-slate-50">
        <Link to={"/"}>
          <img src={logo} className="h-15 w-30" alt="Logo" width="120" />
        </Link>
        <div className="md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <DangerousOutlinedIcon /> : <ListIcon />}
          </button>
        </div>
        {renderMenuLinks()}
        {renderIcons()}
      </nav>
    </div>
  );
}

export default Navbar;
