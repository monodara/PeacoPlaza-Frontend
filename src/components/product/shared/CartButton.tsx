import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="p-2 rounded-full bg-green-500 text-white mx-5 -mb-4 hover:bg-green-400 focus:outline-none focus:bg-green-400"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    <ShoppingCartIcon />
  </button>
);

export default CartButton;
