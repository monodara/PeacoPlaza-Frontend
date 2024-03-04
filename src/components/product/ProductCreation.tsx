import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppState, useAppDispatch } from "../../redux/store";
import { object, string, number } from "yup";

import { ProductCreatedType } from "../../misc/type";
import { createProductsAsync } from "../../redux/slices/productSlice";

export default function ProductCreation() {
  const dispatch = useAppDispatch();
  const categoryList = useSelector(
    (state: AppState) => state.categories.categoryList
  );

  const [productInfo, setProductInfo] = useState<ProductCreatedType>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });

  const [createResult, setCreateResult] = useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(event.target.value);
    setProductInfo((prevState) => ({
      ...prevState,
      categoryId,
    }));
  };

  // Form validation schema
  const productInfoSchema = object().shape({
    title: string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    price: number().min(0.1, "Not a Valid Price").required("Required"),
    description: string().min(8, "Too short!").required("Required"),
    image: string().required("Required"),
  });

  function onSubmit(values: ProductCreatedType & { image?: string }) {
    const { title, price, description, image } = values;
    const newProduct: ProductCreatedType = {
      title,
      price: Number(price),
      description,
      categoryId: productInfo.categoryId,
      images: image ? [image] : [],
    };
    dispatch(createProductsAsync(newProduct))
      .then((response) => {
        if (typeof response.payload === "string")
          setCreateResult(`Creation Failed: ${response.payload}`);
        else
          setCreateResult(
            `Successfully created: ${JSON.stringify(response.payload)}`
          );
      })
      .catch((error) => {
        setCreateResult(error.message as string);
      });
  }
  if (createResult) alert(createResult);

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold mb-4 mt-6">Create a New Product</h3>
        <Formik
          initialValues={productInfo}
          validationSchema={productInfoSchema}
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
                  label="Title"
                  id="title"
                  name="title"
                  error={errors.title && touched.title}
                  helperText={<ErrorMessage name="title" />}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Price"
                  id="price"
                  name="price"
                  error={errors.price && touched.price}
                  helperText={<ErrorMessage name="price" />}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Description"
                  id="description"
                  name="description"
                  error={errors.description && touched.description}
                  helperText={<ErrorMessage name="description" />}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Image"
                  id="images"
                  name="image"
                  error={errors.images && touched.images}
                  helperText={<ErrorMessage name="image" />}
                  sx={{ mb: 2 }}
                />
                <FormControl
                  component="fieldset"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormLabel component="legend">Choose a Category</FormLabel>
                  <RadioGroup
                    aria-label="category"
                    name="category"
                    value={productInfo.categoryId}
                    onChange={handleChange}
                    sx={{ flexDirection: "row" }} // 控制RadioGroup内部Flex方向
                  >
                    {categoryList.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        value={category.id.toString()}
                        control={<Radio />}
                        label={category.name}
                        sx={{ mr: 2 }} // 控制FormControlLabel之间的间距
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    display: "block",
                    margin: "20px auto",
                    backgroundColor: "#72BD41",
                  }}
                >
                  Create
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
