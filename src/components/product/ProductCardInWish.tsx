import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ProductType } from "../../misc/type";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from "../../redux/slices/productSlice";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductCardInWishList({
  product,
}: {
  product: ProductType;
}) {
  const dispatch = useDispatch();

  function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  }

  function handleHeartClick(item: ProductType) {
    dispatch(addToWishList(item));
  }

  function handleDeleteClick(item: ProductType) {
    dispatch(removeFromWishList(item));
  }

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <button
        className="absolute top-0 left-0 p-3 rounded-full text-white -mt-2 ml-0 focus:outline-none"
        style={{ backgroundColor: "transparent", zIndex: "10" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDeleteClick(product);
        }}
      >
        <DeleteForeverOutlinedIcon />
      </button>

      <Link to={`${product.id}`}>
        <div
          className="flex items-end justify-end h-96 w-full bg-cover"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        >
          {/* Existing buttons */}
          <button
            className="p-2 rounded-full bg-green-600 text-white mx-2 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleHeartClick(product);
            }}
          >
            <FavoriteBorderIcon />
          </button>
          <button
            className="p-2 rounded-full bg-blue-600 text-white mx-2 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              cartButtonHandler(product);
            }}
          >
            <ShoppingCartOutlinedIcon />
          </button>
        </div>
      </Link>
      <div className="px-5 py-3 ">
        <h3 className="text-gray-700 uppercase">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <span className="text-gray-500 mt-6 font-semibold text-right">
          {`${product.price}.00€`}
        </span>
      </div>
    </div>
  );
}
