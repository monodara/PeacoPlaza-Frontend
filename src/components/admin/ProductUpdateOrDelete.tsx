import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";

import { useAppDispatch } from "../../redux/store";
import {
  deleteProductsAsync,
  updateProductsAsync,
} from "../../redux/slices/productSlice";
import DeletePopover from "../product/DeletePopover";
import { ProductType } from "../../misc/type";
import { buttonStyle, inputFormStyles } from "../../misc/style";
import { useTheme } from "../contextAPI/ThemeContext";

export default function ProductUpdateOrDelete() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const inputFieldStyles = inputFormStyles(textPrimaryColor);
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
    console.log("first");
    const { newTitle, newPrice } = values;
    console.log(values + "hi");
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
  if (updateResult) {
    alert(updateResult);
    setUpdateResult(undefined);
  }

  return (
    <div>
      <h3
        className="text-2xl font-bold mb-4 mt-6"
        style={{ color: textPrimaryColor }}
      >
        Update/Delete the Product
      </h3>

      <p className="mb-10" style={{ color: primaryColor }}>
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
                sx={inputFieldStyles}
              />
              <Field
                as={TextField}
                fullWidth
                label="New Price"
                id="newPrice"
                name="newPrice"
                error={errors.newPrice && touched.newPrice}
                helperText={<ErrorMessage name="newPrice" />}
                sx={inputFieldStyles}
              />

              <Button
                variant="contained"
                type="submit"
                sx={theme.typography.button}
              >
                Update
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Button
        variant="contained"
        sx={theme.typography.button}
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
