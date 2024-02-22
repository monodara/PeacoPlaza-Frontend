import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useFetchSingleProduct } from "../../hooks/useFetchSingleProducts";
import { useDispatch } from "react-redux";
import { ProductType } from "../../misc/type";
import { addToCart } from "../../redux/slices/cartSlice";

export default function SingleProduct() {
  const { id } = useParams();
  const url = `https://api.escuelajs.co/api/v1/products/${id}`;
  const { product, loading, error } = useFetchSingleProduct(url);
  const dispatch = useDispatch();
  function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  }
  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (error) return <p>{error}</p>;
  return (
    <div>
      <p>{product?.title}</p>
      <img src={product?.images[0]} />
      {product && (
        <button onClick={() => cartButtonHandler(product)}>add to cart</button>
      )}
    </div>
  );
}
