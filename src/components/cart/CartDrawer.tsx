import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { closeRightDrawer } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import ProductsInCart from "../product/ProductsInCart";

export function CartDrawer() {
  const drawerOpen = useSelector((state: AppState) => state.cart.drawerOpen);
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(closeRightDrawer());
  };

  return (
    <React.Fragment>
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        className="p-4"
        placeholder={undefined}
        placement="right"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" placeholder={undefined}>
            Subtotal in Cart
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
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
        <Link to={"./cart"}>
          <Button size="sm" variant="outlined" placeholder={undefined}>
            Go to Cart
          </Button>
        </Link>
        <ProductsInCart />
      </Drawer>
    </React.Fragment>
  );
}
