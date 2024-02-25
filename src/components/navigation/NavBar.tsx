import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { CartProductType } from "../../misc/type";
import ListIcon from "@mui/icons-material/List";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import { openRightDrawer } from "../../redux/slices/cartSlice";

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
  function openDrawer() {
    dispatch(openRightDrawer());
  }
  return (
    <nav className="flex flex-wrap items-center justify-between p-3 bg-slate-50">
      <Link to={"/"}>
        <img src={logo} className="h-15 w-30" alt="Logo" width="120" />
      </Link>
      <div className="md:hidden">
        <button id="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <DangerousOutlinedIcon /> : <ListIcon />}
        </button>
      </div>
      <div
        className={`toggle ${
          isMenuOpen ? "" : "hidden"
        } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-green-900 md:border-none`}
      >
        <a
          href="/products"
          className="block md:inline-block text-green-900 hover:text-green-500 px-3 py-3 border-b-2 border-green-900 md:border-none"
        >
          All Products
        </a>
        <a
          href="/categories"
          className="block md:inline-block text-green-900 hover:text-green-500 px-3 py-3 border-b-2 border-green-900 md:border-none"
        >
          By Category
        </a>
      </div>
      <div
        className={`toggle ${
          isMenuOpen ? "" : "hidden"
        } md:flex items-center justify-end w-full md:w-auto`}
      >
        <div className="flex flex-row-reverse mt-6">
          <Link to={"./cart"}>
            <AccountCircle className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4" />
          </Link>
          <Badge
            badgeContent={productsInCart.reduce(
              (sum, item: CartProductType) => {
                return sum + item.amount;
              },
              0
            )}
            color="error"
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Link to={"./cart"}>
              <ShoppingCartIcon
                className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4"
                onClick={openDrawer}
              />
            </Link>
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
            <Link to={"./wishlist"}>
              <FavoriteIcon className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4" />
            </Link>
          </Badge>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
