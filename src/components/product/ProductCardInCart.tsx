import React, { ChangeEvent, useState } from "react";
import { CartProductType } from "../../misc/type";
import { useDispatch } from "react-redux";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  closeRightDrawer,
  decrementProductAmount,
  incrementProductAmount,
  removeFromCart,
  updateProductAmount,
} from "../../redux/slices/cartSlice";
import DeletePopover from "./DeletePopover";

export default function ProductCardInCart({
  product,
}: {
  product: CartProductType;
}) {
  //control Modal component
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    dispatch(closeRightDrawer()); //close the drawer
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const dispatch = useDispatch();
  function amountHandler(
    e: ChangeEvent<HTMLInputElement>,
    product: CartProductType
  ) {
    const newAmount = parseInt(e.target.value);
    if (newAmount <= 0) {
      handleOpenModal();
    } else {
      dispatch(updateProductAmount({ product, newAmount }));
    }
  }
  function decrementAmount(product: CartProductType) {
    if (product.amount > 1) dispatch(decrementProductAmount(product));
    else {
      handleOpenModal();
    }
  }
  function incrementAmount(product: CartProductType) {
    dispatch(incrementProductAmount(product));
  }
  function deleteClickHandle() {
    // Dispatch action to delete the product from the cart
    dispatch(removeFromCart(product));
    handleCloseModal(); // Close the modal after deletion
  }
  return (
    <div className="flex gap-6 items-center justify-between gap-4 py-8">
      <div className="h-64 bg-gray-100 p-6 rounded">
        <img
          src={product.images[0]}
          className="w-full h-full object-contain shrink-0"
        />
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-md font-bold text-[#333] text-left">
          {product.title}
        </p>
        <h4 className="text-xl font-bold text-[#333] mt-4 text-left">
          {`€${product.price * product.amount}.00`}
        </h4>
        <div className="mt-6 flex items-center">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => decrementAmount(product)}
          >
            -
          </span>
          <input
            type="text"
            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
            value={product.amount}
            onChange={(e) => amountHandler(e, product)}
          />
          <span
            className="font-semibold cursor-pointer"
            onClick={() => incrementAmount(product)}
          >
            +
          </span>
        </div>
      </div>
      <button onClick={handleOpenModal}>
        <DeleteForeverRoundedIcon />
      </button>
      <DeletePopover
        open={openModal}
        onClose={handleCloseModal}
        onConfirmDelete={deleteClickHandle}
      />
    </div>
  );
}
