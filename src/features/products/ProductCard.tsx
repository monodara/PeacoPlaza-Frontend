import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import UpdateIcon from "@mui/icons-material/Update";

import { ProductType } from "../../misc/type";
import { AppState } from "../../app/store";
import {
  useCartButtonHandler,
  useHeartButtonHandler,
} from "../../hooks/useButtonHandler";
import { ProductInfoInCard } from "./ProductInfoInCard";
import { ProductImage } from "./ProductImage";
import { ProductReadDto } from "./productDto";
import { useTheme } from "../theme/ThemeContext";

export default function ProductCard({ product }: { product: ProductReadDto }) {
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.users.userLoggedIn);
  const cartButtonHandler = useCartButtonHandler();
  const heartButtonHandler = useHeartButtonHandler();

  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const primaryColor = theme.palette.background.paper;
  const secondaryColor = theme.palette.secondary.main;

  const handleUpdDelClick = () => {
    navigate("/Admin/update_delete", { state: { item: product } });
  };

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-green-400">
      {user?.role === "Admin" && <AdminControls onClick={handleUpdDelClick} />}
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

const AdminControls = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute top-0 left-0 p-3 rounded-full text-green-700 -mt-2 ml-0 focus:outline-none"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
  >
    <UpdateIcon />/<DeleteForeverOutlinedIcon />
  </button>
);
