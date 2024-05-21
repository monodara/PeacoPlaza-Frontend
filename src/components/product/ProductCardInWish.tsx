import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { removeFromWishList } from "../../redux/slices/productSlice";
import { ProductType } from "../../misc/type";
import {
  useCartButtonHandler,
  useHeartButtonHandler,
} from "../../hooks/useButtonHandler";
import { ProductInfoInCard } from "./shared/ProductInfoInCard";
import { ProductImage } from "./shared/ProductImage";
import { useTheme } from "../contextAPI/ThemeContext";
import { ProductReadDto } from "../../features/products/productDto";

export default function ProductCardInWishList({
  product,
}: {
  product: ProductReadDto;
}) {
  const dispatch = useDispatch();
  const cartButtonHandler = useCartButtonHandler();
  const heartButtonHandler = useHeartButtonHandler();
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;

  const handleDeleteClick = () => {
    dispatch(removeFromWishList(product));
  };

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-green-400">
      <DeleteButton onClick={handleDeleteClick} />
      <Link to={`/products/${product.id}`}>
        <ProductImage
          product={product}
          onHeartClick={() => heartButtonHandler(product)}
          onCartClick={() => cartButtonHandler(product)}
          showHeartButton={false}
        />
      </Link>
      <ProductInfoInCard product={product} />
    </div>
  );
}

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute top-0 left-0 p-3 rounded-full text-green-700 -mt-2 ml-0 focus:outline-none"
    style={{ backgroundColor: "transparent", zIndex: "10" }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    <DeleteForeverOutlinedIcon />
  </button>
);
