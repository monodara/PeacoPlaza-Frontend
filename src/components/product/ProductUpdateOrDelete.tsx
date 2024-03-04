import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/store";

import { deleteProductsAsync } from "../../redux/slices/productSlice";
import DeletePopover from "./DeletePopover";

export default function ProductUpdateOrDelete() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { item } = location.state;
  // Delete Logic
  const [openDelModal, setOpenDelModal] = useState<boolean>(false);
  const handleOpenDelModal = () => {
    setOpenDelModal(true);
  };
  const handleCloseDelModal = () => {
    setOpenDelModal(false);
  };
  function deleteHandler() {
    handleOpenDelModal();
  }
  function updateHandler() {}
  function deleteClickHandle() {
    // Dispatch action to delete the product from the backend
    dispatch(deleteProductsAsync(item));
    handleCloseDelModal(); // Close the modal after deletion
  }
  return (
    <div>
      ProductUpdateOrDelete
      <p>Product: {item.title}</p>
      <p>Product ID: {item.id}</p>
      <div>
        <TextField
          required
          id="outlined-required"
          label="New Title"
          defaultValue={item.title}
        />
        <TextField
          id="outlined-error-helper-text"
          label="New Price"
          defaultValue={item.price}
          helperText="Has to Be a Number"
        />
      </div>
      <div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            display: "block",
            margin: "20px auto",
            backgroundColor: "#72BD41",
          }}
          onClick={updateHandler}
        >
          Update
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            display: "block",
            margin: "20px auto",
            backgroundColor: "#72BD41",
          }}
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </div>
      <DeletePopover
        open={openDelModal}
        onClose={handleCloseDelModal}
        onConfirmDelete={deleteClickHandle}
      />
    </div>
  );
}
