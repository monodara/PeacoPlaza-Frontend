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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();

  function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  }

  function handleHeartClick(item: ProductType) {
    dispatch(addToWishList(item));
  }

  return (
    <div className="max-w-xs mx-auto rounded-md overflow-hidden border border-gray-300">
      <Link to={`${product.id}`}>
        <div
          className="flex items-end justify-end h-60 w-full bg-cover"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        >
          {/* Heart button */}
          <button
            className="p-2 rounded-full bg-green-600 text-white ml-2 -mb-4 hover:bg-green-500 focus:outline-none focus:bg-green-500"
            onClick={(e) => {
              e.preventDefault(); // Prevent default action (navigation)
              e.stopPropagation(); // Stop event propagation
              handleHeartClick(product);
            }}
          >
            <FavoriteIcon />
          </button>

          {/* Cart button */}
          <button
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            onClick={(e) => {
              e.preventDefault(); // Prevent default action (navigation)
              e.stopPropagation(); // Stop event propagation
              cartButtonHandler(product);
            }}
          >
            <ShoppingCartIcon />
          </button>
        </div>
      </Link>

      {/* Product details */}
      <div className="px-5 py-3">
        {/* Product title */}
        <h3 className="text-gray-700 font-semibold text-sm uppercase mb-2">
          {product.title}
        </h3>
        {/* Product description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>
        {/* Product price */}
        <span className="text-gray-700 font-semibold text-right">
          {`${product.price}.00€`}
        </span>
      </div>
    </div>
  );
}
