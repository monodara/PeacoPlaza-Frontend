import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import HeartButton from "./HeartButton";
import { ProductType } from "../../../misc/type";

interface ProductImageProps {
  product: ProductType;
  showHeartButton: boolean;
  onHeartClick: () => void;
  onCartClick: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  showHeartButton,
  onHeartClick,
  onCartClick,
}) => (
  <Link to={`/products/${product.id}`}>
    <div
      className="flex items-end justify-end h-60 w-full bg-cover"
      style={{
        backgroundImage: `url(${product.images[0].replace(/[\[\]"]/g, "")})`,
      }}
    >
      {showHeartButton && <HeartButton onClick={onHeartClick} />}
      <CartButton onClick={onCartClick} />
    </div>
  </Link>
);
