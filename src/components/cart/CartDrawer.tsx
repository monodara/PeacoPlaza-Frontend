import React, { useCallback } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

import { AppState } from "../../redux/store";
import { closeRightDrawer } from "../../redux/slices/cartSlice";
import ProductsInCart from "./ProductsInCart";
import { useTheme } from "../contextAPI/ThemeContext";

interface CartHeaderProps {
  onClose: () => void;
  textColor: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({ onClose, textColor }) => (
  <div className="flex items-center justify-between">
    <h1
      className="text-lg font-bold"
      style={{ color: textColor, marginTop: 24, marginLeft: 24 }}
    >
      Subtotal in Cart
    </h1>
    <CloseIcon onClick={onClose} sx={{ color: textColor }} />
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
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      placeholder={undefined}
      placement="right"
      style={{ overflowY: "auto", backgroundColor: backgroundColor }}
    >
      <div
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh)",
          backgroundColor: backgroundColor,
        }}
      >
        <CartHeader onClose={closeDrawer} textColor={textPrimaryColor} />
        <div className="ml-6 text-left">
          <Button
            variant="contained"
            type="button"
            sx={theme.typography.button}
            onClick={visitCartPage}
          >
            Go to Cart
          </Button>
        </div>
        <div className="ml-2">
          <ProductsInCart />
        </div>
      </div>
    </Drawer>
  );
};
