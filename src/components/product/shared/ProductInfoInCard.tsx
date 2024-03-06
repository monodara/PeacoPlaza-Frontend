import { ProductType } from "../../../misc/type";

export const ProductInfoInCard = ({ product }: { product: ProductType }) => (
  <div className="px-5 py-3">
    <h3 className="text-gray-700 font-semibold text-sm uppercase mb-2 mt-4">
      {product.title}
    </h3>
    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
      {product.description}
    </p>
    <span className="text-gray-700 font-semibold text-right">
      {`${product.price}.00€`}
    </span>
  </div>
);
