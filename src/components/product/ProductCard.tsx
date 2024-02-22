import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ProductType } from "../../misc/type";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  }
  function handleHeartClick(item: ProductType) {
    dispatch(addToWishList(item));
  }
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <Link to={`${product.id}`}>
        <div
          className="flex items-end justify-end h-96 w-full bg-cover"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        >
          <button
            className="p-2 rounded-full bg-green-600 text-white ml-2 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={(e) => {
              e.preventDefault(); // Prevent default action (navigation)
              e.stopPropagation(); // Stop event propagation
              handleHeartClick(product);
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 21.943l-1.425-1.297C5.77 16.254 2 12.35 2 8.5 2 5.42 4.42 3 7.5 3c1.957 0 3.743 1.102 4.5 2.5C12.757 4.102 14.543 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.85-3.77 7.754-8.575 12.146L12 21.943z"></path>
            </svg>
          </button>
          <button
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            onClick={(e) => {
              e.preventDefault(); // Prevent default action (navigation)
              e.stopPropagation(); // Stop event propagation
              cartButtonHandler(product);
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
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
