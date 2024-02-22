import React, { useState } from "react";
import { CartProductType } from "../../misc/type";
import { useDispatch } from "react-redux";
import {
  decrementProductAmount,
  incrementProductAmount,
  removeFromCart,
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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const dispatch = useDispatch();
  function amountHandler() {}
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
    <div>
      <div className="flex justify-between items-center mt-6 pt-6">
        <div className="flex  items-center">
          <img src={product.images[0]} width="60" className="rounded-full " />

          <div className="flex flex-col ml-3">
            <span className="md:text-md font-medium">{product.title}</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="pr-8 flex ">
            <span
              className="font-semibold"
              onClick={() => decrementAmount(product)}
            >
              -
            </span>
            <input
              type="text"
              className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
              value={product.amount}
              onChange={amountHandler}
            />
            <span
              className="font-semibold"
              onClick={() => incrementAmount(product)}
            >
              +
            </span>
          </div>

          <div className="pr-8 ">
            <span className="text-xs font-medium">{`${
              product.price * product.amount
            }.00€`}</span>
          </div>
          <button onClick={handleOpenModal}>❌</button>
          <DeletePopover
            open={openModal}
            onClose={handleCloseModal}
            onConfirmDelete={deleteClickHandle}
          />
        </div>
      </div>
    </div>
  );
}
