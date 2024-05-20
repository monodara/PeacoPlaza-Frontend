import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useFetchSingleProduct } from "../hooks/useFetchSingleProducts";
import {
  useCartButtonHandler,
  useHeartButtonHandler,
} from "../hooks/useButtonHandler";
import { useTheme } from "../components/contextAPI/ThemeContext";

export default function SingleProduct() {
  const { id } = useParams();
  const url = `https://api.escuelajs.co/api/v1/products/${id}`;
  const { product, loading, error } = useFetchSingleProduct(url);
  const cartButtonHandler = useCartButtonHandler();
  const heartButtonHandler = useHeartButtonHandler();

  const [thumbImg, setThumbImg] = useState("");
  useEffect(() => {
    if (product && product.productImages && product.productImages.length > 0) {
      setThumbImg(product.productImages[0].data);
    }
  }, [product]);
  function thumbImgHandler(src: string) {
    setThumbImg(src);
  }
  const { theme } = useTheme();
  const color = theme.palette.text.primary;
  const primaryColor = theme.palette.primary.main;
  const backgroundColor = theme.palette.background.default;

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (product) {
    return (
      <div className="font-[sans-serif] mt-10">
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left section for images */}
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <div className="sm:space-y-3 w-16 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                {product?.productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.data}
                    alt={`image${index}`}
                    className="w-full cursor-pointer"
                    onClick={() =>
                      thumbImgHandler(image.data)
                    }
                  />
                ))}
              </div>
              <img
                src={thumbImg}
                alt="Product"
                className="w-4/5 rounded object-cover"
              />
            </div>
            {/* Right section for product details */}
            <div className="flex flex-col" style={{ color }}>
              <div className="text-left">
                <h2 className="text-2xl font-extrabold">{product?.title}</h2>
                <div className="mt-2">
                  <p className="text-xl font-bold">€{product?.price}</p>
                </div>
              </div>
              <div id="review-stars" className="flex space-x-2 mt-4">
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 fill-green-400"
                    viewBox="0 0 14 13"
                    fill={"none"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
                <svg
                  className="w-5 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold" style={{ color }}>
                  Options
                </h3>
                <div className="flex space-x-4 mt-4">
                  {["S", "M", "L"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="w-12 h-12 border-2 hover:border-green-500 focus:border-green-500 font-bold text-sm rounded-full flex items-center justify-center"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  className="w-full px-4 py-3 border-green-500 hover:bg-green-400 focus:border-green-500 text-white font-bold rounded mr-4"
                  style={theme.typography.button}
                  onClick={() => cartButtonHandler(product)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="w-12 h-12 border hover:border-gray-300 text-gray-800 font-bold rounded"
                  style={{ backgroundColor: "#fff" }}
                  onClick={() => heartButtonHandler(product)} // add function for wishlist
                >
                  <FavoriteIcon />
                </button>
              </div>
              <div className="mt-8 text-left">
                <h3 className="text-lg font-bold" style={{ color }}>
                  About the product
                </h3>
                <p className="mt-2 text-sm" style={{ color }}>
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
