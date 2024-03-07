import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { buttonInCardStyle } from "./HeartButton";

const CartButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className={`${buttonInCardStyle} mr-6`}
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
