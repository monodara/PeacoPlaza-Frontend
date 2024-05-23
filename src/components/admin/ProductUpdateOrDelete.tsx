import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";

import { useAppDispatch } from "../../redux/store";
import {
  productsActions,
} from "../../features/products/productSlice";
import DeletePopover from "../DeletePopover";
import { ProductType } from "../../misc/type";
import { inputFormStyles } from "../../misc/style";
import { useTheme } from "../contextAPI/ThemeContext";
import { ProductReadDto, ProductUpdateDto } from "../../features/products/productDto";

export default function ProductUpdateOrDelete() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;

  const inputFieldStyles = inputFormStyles(textPrimaryColor);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { item } = location.state;
  // Delete Logic
  const [deleteResult, setDeleteResult] = useState<string | undefined>();
  const [openDelModal, setOpenDelModal] = useState<boolean>(false);
  const handleOpenDelModal = () => {
    setOpenDelModal(true);
  };
  const handleCloseDelModal = () => {
    setOpenDelModal(false);
  };
  function handleDelete() {
    handleOpenDelModal();
  }
  function handleDeleteConfirmation() {
    // Dispatch action to delete the product from the backend
    handleCloseDelModal(); // Close the modal after deletion
    dispatch(productsActions.deleteOne(item))
      .then((response) => {
        if (typeof response.payload === "string")
          setDeleteResult(`Delete Failed: ${response.payload}`);
        else {
          const deleteRes = JSON.parse(JSON.stringify(response.payload));
          setDeleteResult(`Successfully deleted.`);
        }
      })
      .catch((error) => {
        setDeleteResult(error.message as string);
      });
  }
  const navigate = useNavigate();
  if (deleteResult) {
    alert(deleteResult);
    setDeleteResult(undefined);
    navigate("/products");
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
    const newProduct: ProductUpdateDto = {
      ...item,
      title: newTitle,
      price: newPrice,
    };
    dispatch(productsActions.createOne(newProduct))
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
        onClick={handleDelete}
      >
        Delete
      </Button>
      <DeletePopover
        open={openDelModal}
        onClose={handleCloseDelModal}
        onConfirmDelete={handleDeleteConfirmation}
      />
    </div>
  );
}
