import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import UpdateIcon from "@mui/icons-material/Update";

import { ProductType } from "../../misc/type";
import { AppState } from "../../redux/store";
import {
  useCartButtonHandler,
  useHeartButtonHandler,
} from "../../hooks/useButtonHandler";
import { ProductInfoInCard } from "./shared/ProductInfoInCard";
import { ProductImage } from "./shared/ProductImage";

// Import necessary modules/components

export default function ProductCard({ product }: { product: ProductType }) {
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.users.user);
  const cartButtonHandler = useCartButtonHandler();
  const heartButtonHandler = useHeartButtonHandler();

  const handleUpdDelClick = () => {
    navigate("/admin/update_delete", { state: { item: product } });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      {user?.role === "admin" && <AdminControls onClick={handleUpdDelClick} />}
      <ProductImage
        product={product}
        onHeartClick={() => heartButtonHandler(product)}
        onCartClick={() => cartButtonHandler(product)}
        showHeartButton={true}
      />
      <ProductInfoInCard product={product} />
    </div>
  );
}

// Separate components

const AdminControls = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute top-0 left-0 p-3 rounded-full text-green-500 -mt-2 ml-0 focus:outline-none"
    style={{ backgroundColor: "transparent" }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    <UpdateIcon />/<DeleteForeverOutlinedIcon />
  </button>
);
