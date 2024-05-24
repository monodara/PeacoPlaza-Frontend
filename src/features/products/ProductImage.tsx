import React from "react";
import { Link } from "react-router-dom";
import CartButton from "../../components/CartButton";
import HeartButton from "../../components/HeartButton";
import { ProductType } from "../../misc/type";
import { ProductReadDto } from "./productDto";

interface ProductImageProps {
  product: ProductReadDto;
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
        backgroundImage: `url(${product.productImages[0].data})`,
      }}
    >
      {showHeartButton && <HeartButton onClick={onHeartClick} />}
      <CartButton onClick={onCartClick} />
    </div>
  </Link>
);
