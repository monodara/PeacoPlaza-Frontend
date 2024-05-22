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
import { object, string, number } from "yup";

import { AppState, useAppDispatch } from "../../redux/store";
import { productsActions } from "../../features/products/productSlice";
import { inputFormStyles } from "../../misc/style";
import { useTheme } from "../contextAPI/ThemeContext";
import { ProductCreateDto } from "../../features/products/productDto";

export default function ProductCreation() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const secondaryColor = theme.palette.secondary.main;
  const inputFieldStyles = inputFormStyles(textPrimaryColor);
  const dispatch = useAppDispatch();
  const categoryList = useSelector(
    (state: AppState) => state.categories.categoryList
  );

  const [productInfo, setProductInfo] = useState<ProductCreateDto>({
    title: "",
    price: 0,
    description: "",
    inventory: 0,
    weight: 0,
    categoryId: "",
    // productImages: [],
  });

  const [createResult, setCreateResult] = useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
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

  function onSubmit(values: ProductCreateDto & { image?: string }) {
    const { title, price, description, image } = values;
    const newProduct: ProductCreateDto = {
      title,
      price: Number(price),
      description,
      inventory: 1,
      weight: 2,
      categoryId: productInfo.categoryId,
      // productImages:[],
    };
    dispatch(productsActions.createOne(newProduct))
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
      <div className="px-4 mx-4">
        <h3
          className="text-2xl font-bold mb-4"
          style={{ color: textPrimaryColor }}
        >
          Create a New Product
        </h3>
        <Formik
          initialValues={productInfo}
          validationSchema={productInfoSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box
                sx={{
                  width: 360,
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
                  sx={inputFieldStyles}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Price"
                  id="price"
                  name="price"
                  error={errors.price && touched.price}
                  helperText={<ErrorMessage name="price" />}
                  sx={inputFieldStyles}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Description"
                  id="description"
                  name="description"
                  error={errors.description && touched.description}
                  helperText={<ErrorMessage name="description" />}
                  sx={inputFieldStyles}
                />
                {/* <Field
                  as={TextField}
                  fullWidth
                  label="Image"
                  id="images"
                  name="image"
                  error={errors.productImages && touched.productImages}
                  helperText={<ErrorMessage name="image" />}
                  sx={inputFieldStyles}
                /> */}
                <FormControl
                  component="fieldset"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormLabel
                    component="legend"
                    style={{ color: textPrimaryColor }}
                  >
                    Choose a Category
                  </FormLabel>
                  <RadioGroup
                    aria-label="category"
                    name="category"
                    value={productInfo.categoryId}
                    onChange={handleChange}
                    sx={{ flexDirection: "row" }}
                  >
                    {categoryList.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        value={category.id.toString()}
                        control={<Radio style={{ color: textPrimaryColor }} />}
                        label={category.name}
                        sx={{ mr: 2, color: textPrimaryColor }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ ...theme.typography.button, marginBottom: 4 }}
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
