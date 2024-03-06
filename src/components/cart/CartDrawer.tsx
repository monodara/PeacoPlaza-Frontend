import React, { useCallback } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppState } from "../../redux/store";
import { closeRightDrawer } from "../../redux/slices/cartSlice";
import ProductsInCart from "./ProductsInCart";

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ onClose }) => (
  <div className="mb-6 flex items-center justify-between">
    <Typography
      className="pt-6 pl-6"
      variant="h5"
      color="blue-gray"
      placeholder={undefined}
    >
      Subtotal in Cart
    </Typography>
    <IconButton
      variant="text"
      color="blue-gray"
      onClick={onClose}
      placeholder={undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </IconButton>
  </div>
);

export const CartDrawer = () => {
  const drawerOpen = useSelector((state: AppState) => state.cart.drawerOpen);
  const dispatch = useDispatch();
  const closeDrawer = useCallback(() => {
    dispatch(closeRightDrawer());
  }, [dispatch]);
  const navigate = useNavigate();
  const visitCartPage = useCallback(() => {
    dispatch(closeRightDrawer());
    navigate("/cart");
  }, [dispatch, navigate]);

  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      placeholder={undefined}
      placement="right"
      style={{ overflowY: "auto" }}
    >
      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 64px)" }}>
        <CartHeader onClose={closeDrawer} />
        <div className="ml-6 text-left">
          <Button
            size="sm"
            variant="outlined"
            className="color-green-500"
            onClick={visitCartPage}
            placeholder={undefined}
          >
            Go to Cart
          </Button>
        </div>
        <ProductsInCart />
      </div>
    </Drawer>
  );
};
