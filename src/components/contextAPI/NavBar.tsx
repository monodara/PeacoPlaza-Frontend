import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";

import logo from "../../images/logo.png";
import { AppState } from "../../redux/store";
import { CartProductType } from "../../misc/type";
import ListIcon from "@mui/icons-material/List";
import { openRightDrawer } from "../../redux/slices/cartSlice";
import { CartDrawer } from "../cart/CartDrawer";
import ThemeToggler from "./ThemeToggler";
import { iconStyle, linkStyle } from "../../misc/style";
import UserLogoutButton from "../user/UserLogoutButton";
import { useTheme } from "./ThemeContext";
import { getSearchKeyword } from "../../redux/slices/productSlice";

function Navbar() {
  const { theme } = useTheme();
  const [hoveredElement, sethoveredElement] = useState<string | null>(null);
  const primaryColor = theme.palette.primary.main;
  const hoverColor = theme.palette.secondary.main;
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

  const openDrawer = () => {
    dispatch(openRightDrawer());
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
      } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-grey-100 md:border-none`}
    >
      <Link
        to="/products"
        className={linkStyle}
        style={{
          color: hoveredElement === "products" ? hoverColor : primaryColor,
        }}
        onMouseEnter={() => sethoveredElement("products")}
        onMouseLeave={() => sethoveredElement(null)}
        onClick={()=>dispatch(getSearchKeyword(""))}
      >
        All Products
      </Link>
      <Link
        to="/categories"
        className={linkStyle}
        style={{
          color: hoveredElement === "category" ? hoverColor : primaryColor,
        }}
        onMouseEnter={() => sethoveredElement("category")}
        onMouseLeave={() => sethoveredElement(null)}
      >
        By Category
      </Link>
      {user && user.role === "Admin" && (
        <Link
          to="/Admin"
          className={linkStyle}
          style={{
            color: hoveredElement === "Admin" ? hoverColor : primaryColor,
          }}
          onMouseEnter={() => sethoveredElement("Admin")}
          onMouseLeave={() => sethoveredElement(null)}
        >
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
        {user && <UserLogoutButton />}
        <Link to={user ? "/profile" : "/login"}>
          <AccountCircle
            className={iconStyle}
            style={{
              color:
                hoveredElement === "profileIcon" ? hoverColor : primaryColor,
            }}
            onMouseEnter={() => sethoveredElement("profileIcon")}
            onMouseLeave={() => sethoveredElement(null)}
          />
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
          <ShoppingCartIcon
            className={iconStyle}
            onClick={openDrawer}
            style={{
              color: hoveredElement === "cartIcon" ? hoverColor : primaryColor,
            }}
            onMouseEnter={() => sethoveredElement("cartIcon")}
            onMouseLeave={() => sethoveredElement(null)}
          />
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
            <FavoriteIcon
              className={iconStyle}
              style={{
                color:
                  hoveredElement === "heartIcon" ? hoverColor : primaryColor,
              }}
              onMouseEnter={() => sethoveredElement("heartIcon")}
              onMouseLeave={() => sethoveredElement(null)}
            />
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
        <ThemeToggler />
        <div className="md:hidden">
          <button id="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? (
              <DangerousOutlinedIcon
                style={{
                  color:
                    hoveredElement === "closeIcon" ? hoverColor : primaryColor,
                }}
                onMouseEnter={() => sethoveredElement("closeIcon")}
                onMouseLeave={() => sethoveredElement(null)}
              />
            ) : (
              <ListIcon
                style={{
                  color:
                    hoveredElement === "listIcon" ? hoverColor : primaryColor,
                }}
                onMouseEnter={() => sethoveredElement("listIcon")}
                onMouseLeave={() => sethoveredElement(null)}
              />
            )}
          </button>
        </div>
        {renderMenuLinks()}
        {renderIcons()}
      </nav>
    </div>
  );
}

export default Navbar;
