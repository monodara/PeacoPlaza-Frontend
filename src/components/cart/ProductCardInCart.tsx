import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Link } from "react-router-dom";

import DeletePopover from "../product/DeletePopover";
import { CartProductType } from "../../misc/type";
import {
  decrementProductAmount,
  incrementProductAmount,
  removeFromCart,
  updateProductAmount,
} from "../../redux/slices/cartSlice";

export default function ProductCardInCart({
  product,
}: {
  product: CartProductType;
}) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

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
    <div className="flex gap-6 items-center justify-between gap-4 py-8">
      <div className="w-64 h-64 bg-gray-100 p-6 rounded">
        <img
          src={product.images[0].replace(/[\[\]"]/g, "")}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-start">
        <Link to={`/products/${product.id}`}>
          <p className="text-md font-bold text-[#333] text-left">
            {product.title}
          </p>
        </Link>
        <h4 className="text-xl font-bold text-[#333] mt-4 text-left">{`€${
          product.price * product.amount
        }.00`}</h4>
        <div className="mt-6 flex items-center">
          <span
            className="font-semibold cursor-pointer"
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
            onClick={incrementAmount}
          >
            +
          </span>
        </div>
      </div>
      <DeleteForeverRoundedIcon
        className="h-6 w-6 text-green-900 hover:text-green-500 cursor-pointer mx-4"
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
