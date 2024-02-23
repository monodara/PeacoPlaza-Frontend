import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircle from "@mui/icons-material/AccountCircle";

import logo from "../../images/logo.png";
import { Badge } from "@mui/material";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-3 bg-slate-50">
      <Link to={"/"}>
        <img src={logo} className="h-15 w-30" alt="Logo" width="120" />
      </Link>
      <div className="md:hidden">
        <button id="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? (
            <img
              className="toggle block"
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="40"
              height="40"
            />
          ) : (
            <img
              className="toggle block"
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="40"
              height="40"
            />
          )}
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
          href="#"
          className="block md:inline-block text-green-900 hover:text-green-500 px-3 py-3 border-b-2 border-green-900 md:border-none"
        >
          Categories
        </a>
      </div>
      <div
        className={`toggle ${
          isMenuOpen ? "" : "hidden"
        } md:flex items-center justify-end w-full md:w-auto`}
      >
        <div className="flex flex-row-reverse mt-6">
          <AccountCircle className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4" />
          <Badge
            badgeContent={4}
            color="error"
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <ShoppingCartIcon className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4" />
          </Badge>
          <FavoriteIcon className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
