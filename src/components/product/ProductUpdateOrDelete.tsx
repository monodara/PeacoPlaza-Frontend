import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";

import {
  deleteProductsAsync,
  updateProductsAsync,
} from "../../redux/slices/productSlice";
import DeletePopover from "./DeletePopover";
import { ProductType } from "../../misc/type";

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
  function deleteClickHandle() {
    // Dispatch action to delete the product from the backend
    dispatch(deleteProductsAsync(item));
    handleCloseDelModal(); // Close the modal after deletion
  }

  // Form validation schema
  const productUpdateSchema = object().shape({
    newTitle: string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    newPrice: number().min(0.1, "Not a Valid Price").required("Required"),
  });
  const [updateResult, setUpdateResult] = useState<string | undefined>();
  function onSubmit(values: { newTitle: string; newPrice: number }) {
    const { newTitle, newPrice } = values;
    const newProduct: ProductType = {
      ...item,
      title: newTitle,
      price: newPrice,
    };
    dispatch(updateProductsAsync(newProduct))
      .then((response) => {
        if (typeof response.payload === "string")
          setUpdateResult(`Update Failed: ${response.payload}`);
        else {
          const updatedProduct = JSON.parse(JSON.stringify(response.payload));
          setUpdateResult(
            `Successfully updated: ${updatedProduct.title}, price €${updatedProduct.price}`
          );
        }
      })
      .catch((error) => {
        setUpdateResult(error.message as string);
      });
  }
  if (updateResult) alert(updateResult);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 mt-6">
        Update/Delete the Product
      </h3>

      <p className="text-green-500 mb-10">
        Product: {item.title}, ID: {item.id}
      </p>
      <Formik
        initialValues={item}
        validationSchema={productUpdateSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "0 auto",
              }}
            >
              <Field
                as={TextField}
                fullWidth
                label="New Title"
                id="newTitle"
                name="newTitle"
                error={errors.newTitle && touched.newTitle}
                helperText={<ErrorMessage name="newTitle" />}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                label="New Price"
                id="newPrice"
                name="newPrice"
                error={errors.newPrice && touched.newPrice}
                helperText={<ErrorMessage name="newPrice" />}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  display: "block",
                  margin: "20px auto",
                  backgroundColor: "#72BD41",
                }}
              >
                Update
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#72BD41", color: "#fff" }}
        onClick={deleteHandler}
      >
        Delete
      </Button>
      <DeletePopover
        open={openDelModal}
        onClose={handleCloseDelModal}
        onConfirmDelete={deleteClickHandle}
      />
    </div>
  );
}
