import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import UpdateIcon from "@mui/icons-material/Update";

import { ProductType } from "../../misc/type";
import { addToWishList } from "../../redux/slices/productSlice";
import { AppState } from "../../redux/store";
import {
  useCartButtonHandler,
  useHeartButtonHandler,
} from "../../hooks/useButtonHandler";

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.users.user);
  const cartButtonHandler = useCartButtonHandler();
  const heartButtonHandler = useHeartButtonHandler();

  function handleUpdDelClick(item: ProductType) {
    navigate("/admin/update_delete", { state: { item } });
  }

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      {user && user.role === "customer" && (
        <button
          className="absolute top-0 left-0 p-3 rounded-full text-green-500 -mt-2 ml-0 focus:outline-none"
          style={{ backgroundColor: "transparent", zIndex: "10" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleUpdDelClick(product);
          }}
        >
          <UpdateIcon />/<DeleteForeverOutlinedIcon />
        </button>
      )}
      <Link to={`/products/${product.id}`}>
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
              heartButtonHandler(product);
            }}
          >
            <FavoriteIcon />
          </button>

          {/* Cart button */}
          <button
            className="p-2 rounded-full bg-green-500 text-white mx-5 -mb-4 hover:bg-green-400 focus:outline-none focus:bg-green-400"
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
        <h3 className="text-gray-700 font-semibold text-sm uppercase mb-2 mt-4">
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
