import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Link } from "react-router-dom";

import DeletePopover from "../shared/DeletePopover";
import { CartProductType } from "../../misc/type";
import {
  decrementProductAmount,
  incrementProductAmount,
  removeFromCart,
  updateProductAmount,
} from "./cartSlice";
import { useTheme } from "../theme/ThemeContext";

export default function ProductCardInCart({
  product,
}: {
  product: CartProductType;
}) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const secondaryColor = theme.palette.secondary.main;
  const backgroundColor = theme.palette.background.default;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (!isNaN(newAmount) && newAmount > 0) {
      dispatch(updateProductAmount({ product, newAmount }));
    } else {
      handleOpenModal();
    }
  };

  const decrementAmount = () => {
    if (product.amount > 1) dispatch(decrementProductAmount(product));
    else handleOpenModal();
  };

  const incrementAmount = () => dispatch(incrementProductAmount(product));

  const handleDeleteClick = () => {
    dispatch(removeFromCart(product));
    handleCloseModal();
  };

  return (
    <div className="flex items-center justify-between gap-4 py-6">
      <div
        className="w-64 bg-gray-100 p-2 rounded shadow-sm"
        style={{ borderColor: primaryColor, border: 1 }}
      >
        {product.productImages && product.productImages.length > 0 ? (
          <img
            src={product.productImages[0].data}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start">
        <Link to={`/products/${product.id}`}>
          <p className="text-lg text-left" style={{ color: textPrimaryColor }}>
            {product.title}
          </p>
        </Link>
        <h4
          className="text-md mt-4 text-left"
          style={{ color: textPrimaryColor }}
        >{`€${product.price * product.amount}.00`}</h4>
        <div className="mt-6 flex items-center">
          <span
            className="font-semibold cursor-pointer"
            style={{ color: textPrimaryColor }}
            onClick={decrementAmount}
          >
            -
          </span>
          <input
            type="text"
            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
            value={product.amount}
            onChange={handleAmountChange}
          />
          <span
            className="font-semibold cursor-pointer"
            style={{ color: textPrimaryColor }}
            onClick={incrementAmount}
          >
            +
          </span>
        </div>
      </div>
      <DeleteForeverRoundedIcon
        className="h-6 w-6 text-green-500 hover:text-red-400 cursor-pointer mx-4"
        onClick={handleOpenModal}
      />
      <DeletePopover
        open={openModal}
        onClose={handleCloseModal}
        onConfirmDelete={handleDeleteClick}
      />
    </div>
  );
}
