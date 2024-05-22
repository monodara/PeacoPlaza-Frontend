import { ProductReadDto } from "../../../features/products/productDto";
import { ProductType } from "../../../misc/type";
import { useTheme } from "../../contextAPI/ThemeContext";

export const ProductInfoInCard = ({ product }: { product: ProductReadDto }) => {
const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.default;
  const secondaryColor = theme.palette.secondary.main;


  return (<div className="px-5 py-3 bg-green-400">
    <h3 className="text-gray-100 font-semibold text-sm uppercase mb-2 mt-4" style={{ color: primaryColor }}>
      {product.title}
    </h3>
    <p className="text-sm text-gray-100 line-clamp-2 mb-4" style={{
          color: primaryColor,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
      {product.description}
    </p>
    <span className="text-gray-100 font-semibold text-right" style={{ color: primaryColor }}>
      {`${product.price}.00€`}
    </span>
  </div>)
}

