import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { removeFromWishList } from "../../redux/slices/productSlice";
import { ProductType } from "../../misc/type";
import { useCartButtonHandler } from "../../hooks/useButtonHandler";

export default function ProductCardInWishList({
  product,
}: {
  product: ProductType;
}) {
  const dispatch = useDispatch();
  const cartButtonHandler = useCartButtonHandler();

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
      <Link to={`/products/${product.id}`}>
        <div
          className="flex items-end justify-end h-60 w-full bg-cover"
          style={{
            backgroundImage: `url(${product.images[0].replace(
              /[\[\]"]/g,
              ""
            )})`,
          }}
        >
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
